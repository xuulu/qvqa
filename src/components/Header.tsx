import config from '../config';

export default function Header() {


    return (
        <header>
            <div style={{
                fontWeight: 'bold',
                fontSize: '20px',
                letterSpacing: '10px' // /* 调整值以达到所需空隙 */
            }}>
                {config.title}
            </div>



        </header>
    );
}
