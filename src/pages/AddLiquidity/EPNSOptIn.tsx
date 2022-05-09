import { channels, OnSubscribeModal } from '@epnsproject/frontend-sdk-staging'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div`
  padding-top: 12px;
  display: 'flex';
  alignitems: 'center';
  flexdirection: 'column';
`
/*
 * GLOBAL CONSTANTS
 */
// EPNS's API base url
const BASE_URL = 'https://backend-kovan.epns.io/apis'

// You have to provide your "channel" address here
const CHANNEL_ADDRESS = '0x9601f08b9EcB981D273B72e7f33964Cb98f977fe' // sample

function EPNSOptIn() {
  const { active, account, chainId, library } = useActiveWeb3React()
  const [isSubscribed, setSubscribeStatus] = useState(false)
  const [channel, setChannel] = useState()
  const [showModal, setShowModal] = useState(false)

  const onClickHandler = (e: any) => {
    e.preventDefault()

    if (!isSubscribed) {
      channels.optIn(library?.getSigner(), CHANNEL_ADDRESS, chainId, account, {
        onSuccess: () => {
          console.log('channel opted in')
          setShowModal(true)
          setSubscribeStatus(true)
        },
      })
    } else {
      channels.optOut(library?.getSigner(), CHANNEL_ADDRESS, chainId, account, {
        onSuccess: () => {
          console.log('channel opted out')
          setSubscribeStatus(false)
        },
      })
    }
  }

  useEffect(() => {
    if (!account) return

    // on page load, fetch channel details
    channels.getChannelByAddress(CHANNEL_ADDRESS, BASE_URL).then((channelData: any) => {
      setChannel(channelData)
    })
    // fetch if user is subscribed to channel
    channels.isUserSubscribed(account, CHANNEL_ADDRESS).then((status: any) => {
      setSubscribeStatus(status)
    })
  }, [account])

  return (
    <Wrapper>
      {showModal && <OnSubscribeModal onClose={() => setShowModal(false)} />}

      {active ? (
        channel ? (
          <div>
            {isSubscribed ? (
              <button onClick={onClickHandler}>OPT-OUT</button>
            ) : (
              <button onClick={onClickHandler}>OPT-IN</button>
            )}
          </div>
        ) : null
      ) : null}
    </Wrapper>
  )
}

export default EPNSOptIn
