import React from "react";
import {
  Document as PDFDocument,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Svg,
  Path,
  Link,
  Image,
} from "@react-pdf/renderer";
import NotoSans from "../../common/NotoSans-Regular.ttf";
import NotoSansBold from "../../common/NotoSans-Bold.ttf";
import wordsack from "../../wordsack.png";

Font.register({
  family: "Noto Sans",
  format: "truetype",
  src: NotoSans,
});
Font.register({
  family: "Noto Sans",
  format: "truetype",
  src: NotoSansBold,
});
// Font.register({
//   family: "Noto Sans",
//   format: "truetype",
//   scr: NotoSansLight,
// });

const styles = StyleSheet.create({
  content: {
    "@media max-width: 400": {
      flexDirection: "column",
    },
    "@media min-width: 400": {
      flexDirection: "column",
    },
  },
  logo: {
    height: "48px",
  },
  block: {
    height: "100%",
    width: "100%",
    backgroundColor: "red",
  },
  data: {
    position: "absolute",
    top: "57px",
    left: 20,
    // transform: "translate(-200%, 0%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 58,
  },
  headingIcon: {
    backgroundColor: "#009432",
    borderRadius: "32px",
    width: "48px",
    height: "48px",
    gap: "8px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontFamily: "Noto Sans",
    fontWeight: 700,
    fontSize: 36,
    textAlign: "center",
    marginLeft: "8px",
  },
  subheading: {
    fontFamily: "Noto Sans",
    fontWeight: 200,
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  box: {
    backgroundColor: "#F4FFF2",
    border: "1px solid #DFF2DC",
    borderRadius: "5px",
    width: "560px",
    height: "198px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 37,
  },
  languageGroup: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  language: {
    color: "#009432",
    fontFamily: "Noto Sans",
    fontWeight: 700,
  },
  detailsContainer: {
    marginTop: 44,
    width: "85%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  detailsItem: {
    fontFamily: "Noto Sans",
    fontWeight: 700,
    fontSize: 12,
    color: "rgba(1, 51, 18, 0.4)",
  },
  itemsData: {
    fontFamily: "Noto Sans",
    fontWeight: 700,
    fontSize: 16,
    color: "#013312",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "560px",
    marginTop: "182px",
  },
  button1: {
    width: "275px",
    height: "72px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #F1F1F1",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText1: {
    color: "#000000",
    fontWeight: "bold",
    textDecoration: "none",
  },
  button2: {
    width: "275px",
    height: "72px",
    backgroundColor: "#731BE3",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText2: {
    color: "white",
    fontWeight: "bold",
    textDecoration: "none",
  },
});

export const DocData = ({
  inputLanguage,
  outputLanguage,
  inputTextWords,
  file,
  hours,
  selectedPackage,
  uploadedWordCount,
}) => {
  let words = 10;

  if (file.length > 0) {
    words = uploadedWordCount;
  } else {
    words = inputTextWords;
  }

  return (
    <PDFDocument>
      <Page size="A4">
        <View style={styles.content}>
          <View style={[styles.block, { backgroundColor: "#BDFFD3" }]} />
          <View style={[styles.block, { backgroundColor: "white" }]} />

          <View style={styles.data}>
            <Image src={wordsack} style={styles.logo} />
            <View style={styles.headingContainer}>
              <View style={styles.headingIcon}>
                <Svg viewBox="0 0 24 24" width={32} height={32}>
                  <Path
                    stroke="#FFFFFF"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    d="M5 12l5 5l10 -10"
                  />
                </Svg>
              </View>
              <Text style={styles.heading}>Payment Successful</Text>
            </View>
            <Text style={styles.subheading}>
              We've received your payment and the translation
            </Text>
            <Text style={styles.subheading}> is being processed.</Text>
            <View style={styles.box}>
              <View style={styles.languageGroup}>
                <Text style={styles.language}>{inputLanguage.label}</Text>
                <Svg viewBox="0 0 24 24" height={20} width={20}>
                  <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <Path
                    d="M4 5h7"
                    strokeWidth="1.5"
                    stroke="#121312"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M9 3v2c0 4.418 -2.239 8 -5 8"
                    strokeWidth="1.5"
                    stroke="#121312"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M5 9c-.003 2.144 2.952 3.908 6.7 4"
                    strokeWidth="1.5"
                    stroke="#121312"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M12 20l4 -9l4 9"
                    strokeWidth="1.5"
                    stroke="#121312"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M19.1 18h-6.2"
                    strokeWidth="1.5"
                    stroke="#121312"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
                <Text style={styles.language}>{outputLanguage.label}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.details}>
                  <Text style={styles.detailsItem}>Words</Text>
                  <Text style={styles.itemsData}>{words}</Text>
                </View>
                <View style={styles.details}>
                  <Text style={styles.detailsItem}>Time</Text>
                  <Text style={styles.itemsData}>{hours}hrs</Text>
                </View>
                <View style={styles.details}>
                  <Text style={styles.detailsItem}>Plan</Text>
                  <Text style={styles.itemsData}>{selectedPackage}</Text>
                </View>
                <View style={styles.details}>
                  <Text style={styles.detailsItem}>ID</Text>
                  <Text style={styles.itemsData}>6746526722</Text>
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Link src="https://codesteak.com/" style={styles.button1}>
                <Text style={styles.buttonText1}>What's Next?</Text>
              </Link>
              <Link src="https://codesteak.com/" style={styles.button2}>
                <Text style={styles.buttonText2}>Track Status</Text>
              </Link>
            </View>
          </View>
        </View>
      </Page>
    </PDFDocument>
  );
};
