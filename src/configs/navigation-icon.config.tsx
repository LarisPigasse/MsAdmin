import React from 'react'
import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineShoppingCart,
    HiOutlineDotsHorizontal,
    HiOutlineSortDescending,
    HiOutlineCog,
    HiOutlineKey,
    HiOutlineChartSquareBar,
    HiOutlineUser,
    HiOutlineUsers,    
} from 'react-icons/hi'
export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    crm: <HiOutlineUsers />,
    cart: <HiOutlineShoppingCart/>,
    option: <HiOutlineDotsHorizontal/>,
    monitor: <HiOutlineDesktopComputer/>,
    admin: <HiOutlineSortDescending/>,
    setup: <HiOutlineCog/>,
    account: <HiOutlineKey/>,
    stat: <HiOutlineChartSquareBar/>,
    user: <HiOutlineUser/>,                          
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,

}

export default navigationIcon
