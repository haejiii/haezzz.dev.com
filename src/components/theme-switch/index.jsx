import './index.scss'

import Switch from 'react-switch'

import { THEME_MODE, useTheme } from '@/theme'
import classNames from 'classnames'

const ThemeSwitch = () => {
  const { mode, toggleThemeMode } = useTheme()
  const isDarkMode = mode === THEME_MODE.DARK

  return (
    <Switch
      checked={isDarkMode}
      width={58}
      offColor="#303030"
      onColor="#ffffff"
      onHandleColor="#303030"
      checkedIcon={<div className={classNames('icon', { checked: isDarkMode })}>D</div>}
      uncheckedIcon={<div className={classNames('icon', { checked: !isDarkMode })}>L</div>}
      onChange={toggleThemeMode}
    />
  )
}

export default ThemeSwitch
