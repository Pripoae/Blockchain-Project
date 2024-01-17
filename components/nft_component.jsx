export default function NftComponent({ name, description, nft_address, price }) {
    const style = {
        container: {
            border: '1px solid #ddd',
            borderRadius: '5px',
            padding: '10px',
            margin: '10px',
        },
        title: {
            fontSize: '20px',
            fontWeight: 'bold',
        },
        description: {
            fontSize: '16px',
        },
        address: {
            fontSize: '14px',
            color: '#888',
        },
        price: {
            fontSize: '18px',
            color: '#0070f3',
        },
    };

    return (
        <div style={style.container}>
            <h1 style={style.title}>{name}</h1>
            <p style={style.description}>{description}</p>
            <p style={style.address}>{nft_address}</p>
            <p style={style.price}>{price}</p>
        </div>
    )
}