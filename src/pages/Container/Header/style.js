/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-restricted-imports */
import { Avatar, Button, Drawer, Layout, Menu } from 'antd'
import styled from 'styled-components'

export const LayoutHeader = styled(Layout.Header)`
  height: 60px;
  line-height: 60px;
  background: #000a1d;
  padding: 0 20px 0 0;
  @media screen and (min-width: 769px) {
    height: 70px;
    line-height: 70px;
    padding: 0 30px 0 20px;
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  user-select: none;
  position: relative;
  z-index: 100;
`

export const LeftSide = styled.div`
  width: 70%;
  @media screen and (min-width: 769px) {
    padding-left: 150px;
  }
  @media screen and (max-width: 768px) {
    width: unset;
  }
`

export const RightSide = styled.div`
  display: flex;
  align-items: center;
`

export const Logo = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
`

export const AvatarWrapper = styled.div`
  cursor: pointer;
  position: relative;
  height: 56px;
  top: -3px;
  @media screen and (min-width: 769px) {
    height: 66px;
    top: -2px;
  }
`

export const AvatarImg = styled(Avatar)`
  width: 30px;
  height: 30px;
`

export const MenuHeader = styled(Menu)`
  color: #fff;
  .ant-menu-item-selected {
    &::after {
      border: none !important;
    }
  }
  .ant-menu-item {
    &::after {
      border: none !important;
    }
    &:hover::after {
      border: none !important;
    }
  }
`

export const MenuHeaderItem = styled.span`
  font-size: 24px;
  text-transform: uppercase;
  display: inline-block;
  font-weight: 600;
  @media screen and (min-width: 769px) {
    font-size: 13px;
  }
`

export const ButtonConnect = styled(Button)`
  text-transform: uppercase;
  background: #0e2c41;
  border: 1px solid #1b4154;
  color: #fff;
  height: 50px;
  padding: 10px 34px 10px 22px;
  &:hover,
  &:focus {
    background: #1a557e;
    color: #fff;
  }
`

export const ButtonConnectMobile = styled(ButtonConnect)`
  height: 34px;
  padding: 5px 8px;
`

export const MenuMobile = styled.div`
  margin-left: 30px;
  cursor: pointer;
`

export default () => {}
