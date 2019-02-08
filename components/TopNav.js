import React, { Component } from 'react'
import { Menu, Container } from 'semantic-ui-react'
import Link from 'next/link'

class TopNav extends Component {

    render () {
        return (
          <Container>
            <Menu fixed='top' inverted>
              <Link href='/'>
                <Menu.Item>HOME</Menu.Item>
              </Link>
              <Link href='/projects'>
                <Menu.Item>PROJECTS</Menu.Item>
              </Link>
            </Menu>
            </Container>
        )
    }
}

export default TopNav
