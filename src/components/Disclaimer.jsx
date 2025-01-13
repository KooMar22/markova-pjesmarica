import "../disclaimer.css";

const Disclaimer = ({ onClose }) => {
    return (
        <div className="disclaimer">
            <div className="disclaimer-content">
                <p>Ova stranica kreirana je i koristi se isključivo u edukativne svrhe.</p>
                <button onClick={onClose}>Razumijem</button>
            </div>
        </div>
    )
}

export default Disclaimer