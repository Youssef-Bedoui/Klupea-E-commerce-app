import React, { useContext, useState, useEffect } from 'react'
import axios from "axios";
import config from "../../config.json";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { AuthContext } from "../context/AuthProvider.js";
import Spinner from "./../spinner/Spinner";

function Orders_sec() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme,user } = useContext(AuthContext);
    const userID = user[0].id;

    useEffect(() => {
        axios.get(`${config.SERVER_URL}/orders/getUserOrders/${userID}`).then((result) => {
            setOrders(result.data);
            setLoading(false);
        })
    }, []);

    if (loading) {
        return <div><Spinner /></div>;
    }

    return (
        <>
            <div className="col mx-3">
                <div className="orders border p-3 my-3">
                    <p className="fw-bold">YOUR ORDERS</p>
                    <hr />
                    {orders.length ? (orders.map((order, index) => {
                        return (
                            <List sx={{ width: '100%', bgcolor: theme === "light" ? 'background.paper' : 'background.secondary' }}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={order.image} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={order.name + " | " + order.price + " TND"}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color={theme === "light" ? "text.primary" : "white"}
                                                >
                                                    Order #{order.orderID.slice(26, 37)}
                                                    {` —  ${order.paymentDate}`}
                                                </Typography>
                                                <Typography
                                                    sx={{ display: 'block' }}
                                                    component="span"
                                                    variant="body3"
                                                    color={order.orderStatus === "Preparing Order" ? "warning.main" : order.orderStatus === "Out To Deliver" ? "primary.main" : order.orderStatus === "Delivered" ? "green" : null}
                                                >
                                                    order status : {order.orderStatus}
                                                </Typography>

                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </List>
                        )
                    })):(<div>
                        <h3 className='d-flex justify-content-center align-items-center fw-bold my-5' style={{height:"50vh"}}>No orders yet !</h3>
                        </div>)}
                </div>
                </div>
        </>
    )
}

export default Orders_sec
