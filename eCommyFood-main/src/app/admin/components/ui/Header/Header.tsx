'use client'
import Link from 'next/link';
import styles from './Header.module.css';
import useLoginStore from '@/store/userauth/login-store';
import { useRouter } from 'next/navigation';


export const Header = () => {

  const logout = useLoginStore(state => state.logout)

  const router = useRouter();

  const onLogout = () => {
    logout();
    router.push('/auth/login');
  }

  return (
    <div className="fixed w-full flex items-center justify-between h-14 text-white z-10">
        <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-blue-800 dark:bg-gray-800 border-none">
          <img className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden" src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg" />
          <span className="hidden md:block">ADMIN</span>
        </div>
        <div className={`flex justify-between items-center h-14 bg-blue-800 dark:bg-gray-800 ${ styles.headerRight }`}>
          <div className="flex items-center w-full max-w-xl mr-4 p-2">
            <Link href="/">Your Logo</Link>
          </div>
          <ul className="flex items-center">
            
            <li>
              <div className="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700"></div>
            </li>
            <li>
              <button onClick={onLogout} className="flex items-center mr-4 hover:text-blue-100">
                <span className="inline-flex mr-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </span>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
  )
}
