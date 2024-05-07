import Switch from 'react-switch'

import { THEME_MODE, useTheme } from '../../theme'
import classNames from 'classnames'

const ThemeSwitch = () => {
  const { mode, onChangeMode } = useTheme()

  const isDarkMode = mode === THEME_MODE.DARK

  const handleChange = () => {
    onChangeMode(isDarkMode ? THEME_MODE.LIGHT : THEME_MODE.DARK)
  }

  return (
    <Switch
      checked={isDarkMode}
      width={58}
      offColor="#000f3c"
      onColor="#f8f9fc"
      onHandleColor="#000f3c"
      checkedIcon={<div className={classNames('icon', { checked: isDarkMode })}>D</div>}
      uncheckedIcon={<div className={classNames('icon', { checked: isDarkMode })}>L</div>}
      onChange={handleChange}
    />
  )
}

export default ThemeSwitch
