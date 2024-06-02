import React from 'react'

function Logo({classname="", theme="dark"}) {
    return (
        <img className={classname} src={`/theblogs-high-resolution-logo-bg-${theme} 1.svg`} alt="logo" />
    )
}

export default Logo
