import Pulse from 'react-reveal/Pulse';
import './Loading.scss';

// import logo from '../../assets/images/logos/logo.png';

function Loader() {
  return (
    <div className="Loader">
      <Pulse forever>
        <div className='lds-grid'>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>
      </Pulse>
    </div>
  )
}

export default Loader;
