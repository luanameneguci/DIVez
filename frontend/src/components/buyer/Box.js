import '../../App.css';

// Mostra as boxes
function Box(props) {
    return (
        <div className="box-container bg-white col-auto roundbg d-flex px-4 py-4 align-items-center shadow">
            <div className="col-10">
                <span className="box-title d-flex"><strong><h6>{props.title}</h6></strong></span>
                <span className="box-number d-flex"><strong><h2>{props.number}</h2></strong></span>
            </div>  
            <div>
                <img src={props.image} alt="" className="box-image" />
            </div>
        </div>
    );
}

export default Box;
