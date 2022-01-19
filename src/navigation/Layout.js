import React, { Component, useState } from 'react';
    import { useEffect } from 'react/cjs/react.development';
    import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export const Layout = props => {
    return (
      <div>
        <NavMenu />
        <Container>
          {props.children}
        </Container>
      </div>
    );
}

export default Layout;