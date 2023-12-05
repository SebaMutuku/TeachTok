import {View, ViewProps} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export function ContainerComponent(props: ViewProps) {
    const insets = useSafeAreaInsets();
    const {style, ...otherProps} = props;
    return <View style={[style, {
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingTop: insets.top,
        paddingRight: insets.right
    }]} {...otherProps}/>

}