import React, {FC} from 'react';
import {Layout, Menu, MenuProps} from "antd";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../router";
import {useAppDispatch, useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useActions} from "../hooks/useAction";


const Navbar: FC = () => {
    const navigate = useNavigate()
    const {logout} = useActions()
    const {isAuth, user} = useTypedSelector(state => state.auth)

    const loginItems: MenuProps['items'] = isAuth
        ?
        [{
            label: user.username,
            key: 'User',
            style: {color: "wheat", cursor: "default"}
        },
            {
                label: 'Выйти',
                key: 'LogOut',
                onClick: () => {
                    logout()
                }
            }]
        :
        [{
            label: 'Логин',
            key: 'Login',
            onClick: () => {
                navigate(RouteNames.LOGIN)
            }
        }]

    return (
        <Layout.Header>
            <Menu
                style={{
                    justifyContent: 'flex-end'
                }}
                theme="dark"
                mode="horizontal"
                selectable={false}
                items={loginItems}
            >
            </Menu>
        </Layout.Header>
    );
};

export default Navbar;