import NetInfo from "@react-native-community/netinfo";


// const checkConnection = () => {
export const checkConnection = NetInfo.fetch().then(state => {
    let result = {}
    result = {
        type: state.type,
        isConnected: state.isConnected,
    }
    console.log(result)
    return result;
});
// }

// export { checkConnection }