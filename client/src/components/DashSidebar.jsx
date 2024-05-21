import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { OuiHome } from './Icons/homeLogo';
import { MaterialSymbolsNewWindowRounded } from './Icons/recetasLogo';
import { SolarUsersGroupRoundedBroken } from './Icons/patientsLogo';
import { SolarSettingsOutline } from './Icons/perfilLogo';
import { SolarNotesMinimalisticLinear } from './Icons/commentsLogo';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import LogoShopy from '../assets/LOGOSHOPPY.png'

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
        <Link
          to='/dashboard?tab=dash'
          className='p-5 self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
        >
          <img src={LogoShopy} height='200' width='200' alt="logo" />
        </Link>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={OuiHome}
                as='div'
              >
                Home
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=users'>
              <Sidebar.Item
                active={tab === 'users'}
                icon={SolarUsersGroupRoundedBroken}
                as='div'
              >
                Pacientes
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={MaterialSymbolsNewWindowRounded}
                as='div'
              >
                Recetas
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <>
              <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={SolarNotesMinimalisticLinear}
                  as='div'
                >
                  Comentarios
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={SolarSettingsOutline}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor='dark'
              as='div'
            >
              Perfil
            </Sidebar.Item>
          </Link>
          {/* <Sidebar.Item
            icon={AkarIconsSignOut}
            className='cursor-pointer'
            onClick={handleSignout}
          >
            Cerrar sesion
          </Sidebar.Item> */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
