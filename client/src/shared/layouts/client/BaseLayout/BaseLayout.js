import './BaseLayout.scss'
import Header from './components/Header'
import useWindowWidth from '../../../hooks'
import DesktopHeader from './components/DesktopHeader'

const BaseLayout = ({ config, header, children }) => {
  const windowWidth = useWindowWidth()
  return (
    <div className={'BaseLayout'}>
      {windowWidth < 768 ? <Header config={config} header={header} /> : <DesktopHeader />}
      <div className={'container'}>{children}</div>
    </div>
  )
}

export default BaseLayout
