import BaseLayout from "../../../shared/layouts/client/BaseLayout";
import {imgApiUrl} from "../../../api";
import avatar from "../../../shared/assets/images/icons/avatar/avatar.svg";
import {useSelector} from "react-redux";

function SpecProfile({handleLogOut}) {

  const {item} = useSelector(state => state.profile)

  // const accordionConfig = {
  //   profilePage: true
  // }
  const header = {title: 'Frest', text: ''}
  // const data = {
  //   title: 'Мои задачи',
  //   count: tasks && tasks.length
  // }

  return (
    <BaseLayout header={header}>
      <div className={'Profile'}>
        <div className='profile-name'>
          <img className={'avatar'} src={item?.userImg ? imgApiUrl + item.userImg : avatar} alt='avatar'/>
          <div className='profile-name-item'>
            <h2 className='title'>{(item?.name + ' ' + item?.surname) || 'Пользователь'}</h2>
            <p className='text'>Исполнитель</p>
            {/*<button className={'btn-regular'}*/}
            {/*        onClick={handleChangeRole}>{changeRoleText}</button>*/}
            <button className='btn-regular' onClick={handleLogOut}>Выйти</button>
          </div>
        </div>
        <h3 className={'profile-items-title'}>Моя активность</h3>
        {/*{tasks && <AccordionUI item={data} subItems={tasks} />}*/}
      </div>
    </BaseLayout>
  );
}

export default SpecProfile;
