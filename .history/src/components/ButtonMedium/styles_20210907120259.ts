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
      alignItems: 'center',
      justifyContent: 'center',
      width: 140,
      height: 56,
      backgroundColor: theme.colors.secondary80,
      borderRadius: 8,
      marginRight: 14,
      borderColor: theme.colors.heading,
    },
    title: {
      flex: 1,
      color: theme.colors.heading,
      fontSize: 15,
      textAlign: 'center',
      fontFamily: theme.fonts.text500
    }

})