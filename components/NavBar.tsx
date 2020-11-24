import {Anchor, Header, Nav, Menu, ResponsiveContext, Heading} from 'grommet';

const menuLinks = [
    {label: 'Features', href: '#'},
    {label: 'Enterprise', href: '#'},
    {label: 'Support', href: '#'},
    {label: 'Login', href: '#'},
];

const CollapsableNav = () => (
    <Header background="dark-1" pad={{horizontal: 'medium'}}>
        <Heading level="6" color="inherit" margin="medium">
            Todos
        </Heading>
        <ResponsiveContext.Consumer>
            {(responsive) =>
                responsive === 'small' ? (
                    <Menu label="Menu" items={menuLinks} />
                ) : (
                    <Nav direction="row">
                        {menuLinks.map((link) => (
                            <Anchor {...link} key={JSON.stringify(link)} />
                        ))}
                    </Nav>
                )
            }
        </ResponsiveContext.Consumer>
    </Header>
);

export const NavBar = () => <CollapsableNav />;
