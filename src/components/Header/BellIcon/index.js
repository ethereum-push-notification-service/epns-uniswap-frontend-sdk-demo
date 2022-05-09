import Bell from './bell.png'
import BellBall from './bellball.png'

const BellIcon = () => {
  return (
    <div style={{ width: 32, height: 32, position: 'relative', cursor: 'pointer' }}>
      <img src={Bell} alt="Bell" style={{ width: 32, height: 32, position: 'absolute' }} />
      <img src={BellBall} alt="Bell Ball" style={{ width: 32, height: 32, position: 'absolute' }} />
    </div>
  )
}

export default BellIcon
