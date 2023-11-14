"use client"
import useDarkMode from './hook/useDarkMode';
import { MdOutlineNightlight, MdOutlineWbSunny } from 'react-icons/md';

/**
 * A toggle for switching between light and dark modes.
 *
 * @param {Object} props - The properties for the component.
 * @param {boolean} props.open - Whether the sidebar is open or not.
 */
const DarkMode = (props) => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  // const ThemeSwitcher = dynamic(() => import('./theme-switcher'))

  /**
   * Toggles the dark mode.
   */
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <div className="darkNav">
      <span className="nav__item  relative  z-[1] w-[52px]" onClick={handleMode}>
        {darkTheme ? (
          <>
            <div className="nav__icons">
              <MdOutlineWbSunny />
            </div>
            <h1 className={`${!props.open && "hidden"}`}>Light</h1>
          </>
        ) : (
          <>
            <div className="nav__icons">
              <MdOutlineNightlight />
            </div>
            <h1 className={`${!props.open && "hidden"}`}>Night</h1>
          </>
        )}

      </span>
    </div>
  )
}

export default DarkMode;