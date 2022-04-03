
export const Navbar = () => (
    <nav>
        <ul style={{ display: 'flex', margin: 0, alignItems: 'center', listStyleType: 'none', height: "60px", backgroundColor: 'gray', padding: '10px'}}>
            <li style={{ flexGrow: 1}}>Course Explorer</li>
            <li><a href="/search">Search</a></li>
        </ul>
    </nav>
)