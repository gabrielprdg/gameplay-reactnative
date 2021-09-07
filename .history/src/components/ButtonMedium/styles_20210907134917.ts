import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
      width: 140,
      height: 56,
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
    },
    containerwithoutConfirm: {
      width: 140,
      height: 56,
      backgroundColor: theme.colors.secondary80,
      borderRadius: 8,
      marginRight: 14,
      borderWidth: 2,
      borderColor: theme.colors.overlay,
    },
    title: {
      flex: 1,
      paddingTop: 15,
      color: theme.colors.heading,
      fontSize: 20,
      textAlign: 'center',
      fontFamily: theme.fonts.title700
    }

})