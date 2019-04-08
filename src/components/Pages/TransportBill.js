// @flow
import React from 'react';
import { } from 'react-native';
import { Container, Header } from 'src/components/Layout';

type Props = {}
type State = {
  bills: Array<Bill>,
}
type Bill = {
  productCode: string,
  productName: string,
  deliveryQuant: string,
  quantReceived: string,
  quantChecked: String,
}

export default class TransportBill extends React.Component<Props, State> {
  render() {
    return (
      <Container>
        <Header title="ĐƠN HÀNG VẬN CHUYỂN" />
      </Container>
    );
  }
}
