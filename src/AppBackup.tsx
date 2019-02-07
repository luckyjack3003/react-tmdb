import React, { MouseEvent, ReactNode } from 'react'
type Props = {
    onClick?(e: MouseEvent<HTMLElement>): void
    children?: ReactNode
}

const App = ({ onClick: handleClick, children }: Props) => (
    <button onClick={handleClick}>{children}</button>
)


export default App;
