import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';
import { AkarIconsSignOut } from './Icons/singoutLogo';
import { SolarUserRoundedBroken } from './Icons/userLogo'

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='border-b-2'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-teal-400 via-teal-550 to-teal-800 rounded-lg text-white'>
          DyC
        </span>
         Coloproctología
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Buscar pacientes...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-5 p-5 md:order-2 hover:border-0'>
        <Button
          className='w-12 h-12 hidden sm:inline bg-teal-600 rounded-full'
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' className='hover:bg-opacity-10 hover:text-teal-500' img={currentUser.profilePicture} rounded>Dr. {currentUser.username}</Avatar>
            }
          >
          <Link 
            to={'/dashboard?tab=profile'}>
            <Dropdown.Item
            icon={SolarUserRoundedBroken}
            className='text-teal-700'
            >
              Perfil
            </Dropdown.Item>
          </Link>
          <Dropdown.Item 
          onClick={handleSignout}
          className='cursor-pointer text-teal-700'
          icon={AkarIconsSignOut}
          >
            Cerrar sesion
          </Dropdown.Item>
        </Dropdown>
      ) : (
        <>
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Iniciar sesion
            </Button>
          </Link>
        </>
        )}
        {/* <Navbar.Toggle /> */}
      </div>
      {/* <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
}
