// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import { NavigationScreenProp, NavigationActions, StackActions } from 'react-navigation';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Container, Header, StoreInfo, SelectLayout, SuccessView
} from '../Layout';
import { commonStyles, measures, colors } from '../../assets';
import { actions } from '../../store';
import { Input, Icon, Button } from '../Widgets';
import { addNewReport, uploadImage } from '../../service';
import { Loading, Modal } from '../Global';
import { SCREENS } from '../../routers';

type Props = {
  navigation: NavigationScreenProp<{}>,
  getTotalBillsCount: () => void,
  getIssueList: () => void,
  storeID: string,
  issueList: Array<{ rowId: string, title: string }>
};

type State = {
  issue: ?string,
  openPicker: boolean,
  issue: string,
  note: string,
  image: Array<?Object>
};

export class ComfirmStoreState extends React.Component<Props, State> {
  state = {
    openPicker: false,
    issue: '',
    note: '',
    image: [null, null, null]
  };

  componentDidMount() {
    const { getTotalBillsCount, getIssueList } = this.props;
    getTotalBillsCount();
    getIssueList();
  }

  onBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  togglePicker = () => this.setState(state => ({
    openPicker: !state.openPicker
  }));

  onChangeValue = (name: string, value: string) => {
    this.setState({
      [name]: value
    });
  };

  openCamera = async (key: number) => {
    const { image } = this.state;
    const img = await ImagePicker.openCamera({
      compressImageMaxWidth: 600,
      compressImageMaxHeight: 800
    });
    image[key] = img;
    this.setState({
      image: [...image]
    });
  };

  onDelete = (key: number) => {
    const { image } = this.state;
    image[key] = null;
    this.setState({
      image: [...image]
    });
  };

  onFinish = () => {
    const { navigation } = this.props;
    Modal.hide();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: SCREENS.LOG_IN_BY_STOREID })]
    });
    navigation.dispatch(resetAction);
  };

  onSendReport = async () => {
    try {
      const { issue, note } = this.state;
      const { image } = this.state;
      const { storeID } = this.props;
      if (!issue) {
        Alert.alert('Không hợp lệ', 'Vui lòng chọn loại vấn đề!');
        return;
      }
      const imageList = image.filter(item => item !== null && item !== undefined);
      if (!imageList || imageList.length === 0) {
        Alert.alert('Không hợp lệ', 'Vui lòng upload ít nhất một ảnh!');
        return;
      }
      Loading.show();
      const reportId = await addNewReport({
        issue,
        note,
        storeID
      });
      const result = await Promise.all(imageList.map(el => uploadImage({ image: el, reportId })));
      if (result) {
        Loading.hide();
        Modal.show(<SuccessView onBack={this.onFinish} />, false);
      } else {
        throw new Error();
      }

      Loading.hide();
    } catch (error) {
      Loading.hide();
    }
  };

  render() {
    const { issueList } = this.props;
    const {
      issue, openPicker, note, image
    } = this.state;
    const issueInfo = issueList.find(el => el.rowId === issue);
    return (
      <Container haveKeyboard>
        <Header handleLeftButton={this.onBack} title="BÁO CÁO VẤN ĐỀ" />
        <View style={styles.content}>
          <StoreInfo />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={{ paddingBottom: measures.paddingLong }}
          >
            <Text style={styles.rowTitle}>Báo cáo vấn đề (*)</Text>
            <Input
              name="issue"
              placeholderText="Chọn vấn đề"
              block
              autoCapitalize="none"
              value={issueInfo && issueInfo.title}
              prependIconName="ios-hand"
              prependIconColor={colors.greensea}
              autoFocus
              type="select"
              openPicker={this.togglePicker}
              appendIcon={openPicker ? 'ios-arrow-dropdown-circle' : 'ios-arrow-dropup-circle'}
            />
            <Text style={[styles.rowTitle, { marginTop: measures.marginMedium }]}>Ghi chú</Text>
            <TextInput
              placeholder="Ghi chú"
              style={styles.textArea}
              multiline
              returnKeyType="go"
              numberOfLines={4}
              onChangeText={value => this.setState({ note: value })}
              value={note}
            />
            <Text style={[styles.rowTitle, { marginTop: measures.marginMedium }]}>
              Đính kèm ảnh (*) - Đính kèm ít nhất một ảnh
            </Text>
            <View style={styles.imageContainer}>
              {_.range(0, 3).map(key => (image[key] ? (
                <View style={styles.cameraButon} key={key.toString()}>
                  <Image source={{ uri: image[key].path }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => this.onDelete(key)}
                  >
                    <Icon name="cross" type="ent" color={colors.white} size={12} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.cameraButon}
                  key={key.toString()}
                  onPress={() => this.openCamera(key)}
                >
                  <Icon name="ios-camera" size={measures.iconSizeLarge} />
                </TouchableOpacity>
              )))}
            </View>
          </ScrollView>
          <Button type="primary" onPress={this.onSendReport} title="GỬI BÁO CÁO" />
        </View>

        {openPicker && (
          <SelectLayout
            onHide={this.togglePicker}
            onChangeValue={this.onChangeValue}
            config={{
              name: 'issue',
              defaultValue: issue,
              options: issueList
            }}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  issueList: state.commonStore.issueList,
  totalItem: state.transStore.totalItem,
  storeID: state.transStore.storeInfo.storeID
});

const mapDispatchToProps = dispatch => ({
  getTotalBillsCount: () => dispatch(actions.getTotalBillsCount()),
  getIssueList: () => dispatch(actions.getIssueList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComfirmStoreState);

const styles = StyleSheet.create({
  content: {
    zIndex: 0,
    flex: 1
  },
  scrollView: {
    margin: measures.marginLong,
    backgroundColor: colors.white,
    ...commonStyles.shadow,
    padding: measures.paddingMedium
  },
  rowTitle: {
    ...commonStyles.textBold,
    color: colors.primaryColor,
    fontSize: measures.fontSizeLarge,
    marginBottom: measures.marginMedium
  },
  issueInput: {
    marginTop: measures.marginMedium,
    borderRadius: measures.borderRadius,
    borderWidth: 1,
    borderColor: colors.smoke,
    height: measures.defaultUnit * 6,
    backgroundColor: colors.white,
    flexDirection: 'row'
  },
  issueValue: {
    alignSelf: 'center',
    flex: 1,
    marginLeft: measures.marginSmall
  },
  appendContainer: {
    height: '100%',
    width: measures.defaultUnit * 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.smoke,
    borderRadius: measures.borderRadius,
    padding: measures.paddingMedium,
    minHeight: measures.defaultUnit * 10
  },
  cameraButon: {
    width: measures.defaultUnit * 10,
    height: measures.defaultUnit * 10,
    borderRadius: measures.borderRadius,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  deleteButton: {
    position: 'absolute',
    top: -measures.defaultUnit,
    right: -measures.defaultUnit,
    height: 3 * measures.defaultUnit,
    width: 3 * measures.defaultUnit,
    borderRadius: 1.5 * measures.defaultUnit,
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: measures.defaultUnit
  }
});
