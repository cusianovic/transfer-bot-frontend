import './css/header.css'

function Header(){
    return(
        <header className="HeaderBox">
            <div className="wrapper HeaderWrapper">
                <div className="Logo"><span className='teko-400'><a href="https://cusianovic.net">Cusianovic</a></span></div>
                <nav>
                    <a href='https://github.com/cusianovic'>Github</a>
                    <a href='https://www.linkedin.com/in/scusianovic/'>LinkedIn</a>
                </nav>

            </div>
        </header>
    );
}


export default Header;