import BaseLayout from "../../../shared/layouts/client/BaseLayout";
import {imgApiUrl} from "../../../api";
import avatar from "../../../shared/assets/images/icons/avatar/avatar.svg";
import AccordionUI from "../../../shared/components/Accordion";
import {useSelector} from "react-redux";
import {getStatus} from "../../../shared/utils";

function ClientProfile({handleLogOut}) {

  const {item, tasks} = useSelector(state => state.profile)


  const accordionConfig = {
    profilePage: true
  }
  const header = {title: 'Frest', text: ''}
  const data = {
    title: 'Мои заказы',
    count: tasks && tasks.length
  }

  return (
    <BaseLayout header={header}>
      <div className={'Profile'}>
        <div className='profile-name'>
          <img className={'avatar'} src={item?.userImg ? imgApiUrl + item.userImg : avatar} alt='avatar'/>
          <div className='profile-name-item'>
            <h2 className='title'>{(item?.name || 'Пользователь') + ' ' + (item?.surname || '')}</h2>
            <p className='text'>Заказчик</p>
            <p className='text green'>{getStatus(item?.lastSeen)}</p>
            {/*<p className='text'>{new Date(item?.lastSeen).getTime() >= Date.now() ? 'Онлайн' : 'Был в сети в'}</p>*/}
            {/*<button className={'btn-regular'}*/}
            {/*        onClick={handleChangeRole}>{changeRoleText}</button>*/}
            <button className='btn-regular' onClick={handleLogOut}>Выйти</button>
          </div>
        </div>
        <h3 className={'profile-items-title'}>Моя активность</h3>

        {tasks && <AccordionUI config={accordionConfig} item={data} subItems={tasks}/>}

      </div>
    </BaseLayout>
  );
}

export default ClientProfile;
