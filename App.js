/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    TouchableOpacity,
    StatusBar,
    ListView,
    Image,
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
const QUERY_URL = 'https://api.douban.com/v2/movie/top250';
export default class App extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            movies: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        }
        this.queryData();
    }

    queryData() {
        fetch(QUERY_URL)
            .then(re => re.json())
            .then(result => {
                this.setState({
                    movies: this.state.movies.cloneWithRows(result.subjects),
                });
            })
            .done();
    }

    btClick() {
        this.setTranslucent();
        Alert.alert(
            `你点击了按钮`,
            'Hello World！',
            [
                {text: '以后再说', onPress: () => console.log('Ask me later pressed')},
                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '确定', onPress: () => console.log('OK Pressed')},
            ]
        )
    }

    setView(movie) {
        return (
            <View style={styles.item}>
              
                <View style={styles.image_content}>
                    <Image style={styles.image} source={{uri: movie.images.large}}/>
                </View>
                <View style={styles.movie_content}>
                    <Text style={styles.title_style}>{movie.title}</Text>
                    <Text style={styles.movie_info}>上映时间：{movie.year}年</Text>
                    <Text style={styles.movie_info}>豆瓣评分：{movie.rating.average}</Text>
                    <Text style={styles.movie_info}>类型：{movie.genres.join('/')}</Text>
                    <Text style={styles.movie_info}>主演：{movie.casts.map(item => item.name).join('/')}</Text>
                    <Text style={styles.movie_info}>导演：{movie.directors.map(item => item.name).join('/')}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView showsVerticalScrollIndicator={false}
                          dataSource={this.state.movies}
                          renderRow={this.setView.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efeff4',
        padding: 10,
        // margin: 20,
        // borderWidth: 1,
        // borderColor: "red",
        // borderRadius: 15,
        // elevation: 10
    },
    item: {
        marginTop: 40,
        flex: 1,
        height: 200,
        backgroundColor: "red",
        flexDirection: "row",
        borderRadius: 10,
        borderColor: "#efeff4",
        borderWidth: 1,
        elevation: 5,
    },
    title_style: {
        color: "#000000",
        fontWeight: '600',
        fontSize: 18
    },
    image_content: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    movie_content: {
        flex: 2,
        backgroundColor: "#fff",
        justifyContent: "center"
    },
    movie_info: {
        color: "#666666",
        fontSize: 14,
        marginTop: 5,
    },
    image: {
        width: 80,
        height: 120,
        borderRadius: 15,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: "red"
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    view: {
        width: "100%",
        height: 300,
        backgroundColor: "#aaffcc"
    },
    mbutton: {
        width: "100px",
        height: 40,
        backgroundColor: "#ccaaff",
        color: "#000"
    },
    mybutton: {
        width: 200,
        height: 60,
        backgroundColor: "red",
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
