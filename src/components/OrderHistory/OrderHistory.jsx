import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import SingleOrder from "../../components/SingleOrder/SingleOrder";
import {
  WS_PROFILE_ORDERS_CONNECTION_START,
  WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  OPEN_DETAILS,
  CLOSE_DETAILS
} from "../../services/actions/wsProfileOrders";
import orderHistoryStyles from "./OrderHistory.module.css";
import Modal from "../../components/Modal/Modal";

export default function OrderHistory() {
  const [opened, setOpened] = useState(false);
  const { orders, orderModal } = useSelector(store => store.wsProfileOrders);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_PROFILE_ORDERS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_PROFILE_ORDERS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  if (!orders) {
    return (
      <h3 className="text text_type_main-large mt-2">
        Загрузка...
      </h3>
    )
  }

  if (orders.length === 0) {
    return (
      <h3 className="text text_type_main-large mt-2">
        Тут будут отображаться Ваши заказы
      </h3>
    )
  }

  function openDetails(item) {
    dispatch({
      type: OPEN_DETAILS,
      order: item
    });
    setOpened(true)
  };

  function closeDetails() {
    dispatch({ type: CLOSE_DETAILS });
    setOpened(false);
    navigate(-1)
  };

  return (
    <>
      <ul className={orderHistoryStyles.order_list}>
        {orders &&
          orders.reverse().map((item, index) => {
            return (
              <li className={orderHistoryStyles.item}
                key={index}
                onClick={() => { openDetails(item) }}
              >
                <Link to={`/profile/orders/${item._id}`}
                  state={{ background: location }}
                  className={orderHistoryStyles.link}
                >
                  <SingleOrder order={item} key={index} modal={false} />
                </Link>
              </li>
            )
          })}
      </ul>
      {opened &&
        <Modal onClose={closeDetails}>
          <SingleOrder order={orderModal} modal={true} />
        </Modal>
      }
    </>
  )
}