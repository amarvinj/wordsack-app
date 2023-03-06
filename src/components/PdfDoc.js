import React from "react";
import {
  Document as PDFDocument,
  Page,
  Text,
  View,
  Font,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

import wordsack from "../wordsack.png";

import NotoSansBold from "../common/fonts/NotoSans-Bold.ttf";
import NotoSansArabic from "../common/fonts/NotoSansArabic.ttf";
import NotoSansJapanese from "../common/fonts/NotoSansJapanese.otf";
import NotoSansKorean from "../common/fonts/NotoSansKorean.otf";
import NotoSansTraditionalChinese from "../common/fonts/NotoSansTraditionalChinese.otf";
import NotoSansSimplifiedChinese from "../common/fonts/NotoSansSimplifiedChinese.otf";
import NotoSansThai from "../common/fonts/NotoSansThai.ttf";
import NotoSansTamil from "../common/fonts/NotoSansTamil.ttf";
import NotoSansMalayalam from "../common/fonts/NotoSansMalayalam.ttf";
import NotoSansHebrew from "../common/fonts/NotoSansHebrew.ttf";
import NotoSansBengali from "../common/fonts/NotoSansBengali.ttf";
import NotoSansSinhala from "../common/fonts/NotoSansSinhala.ttf";
import NotoSansGeorgian from "../common/fonts/NotoSansGeorgian.ttf";
import NotoSansTelugu from "../common/fonts/NotoSansTelugu.ttf";
import NotoSansArmenian from "../common/fonts/NotoSansArmenian.ttf";
import NotoSansKannada from "../common/fonts/NotoSansKannada.ttf";
import NotoSansKhmer from "../common/fonts/NotoSansKhmer.ttf";
import NotoSansOriya from "../common/fonts/NotoSansOriya.ttf";
import NotoSansGujarati from "../common/fonts/NotoSansGujarati.ttf";
import NotoSansThaana from "../common/fonts/NotoSansThaana.ttf";
import NotoSansLao from "../common/fonts/NotoSansLao.ttf";
import NotoSansMyanmar from "../common/fonts/NotoSansMyanmar.ttf";
import NotoSansEthiopic from "../common/fonts/NotoSansEthiopic.ttf";
import NotoSansMeeteiMayek from "../common/fonts/NotoSansMeeteiMayek.ttf";
import NotoSansGurmukhi from "../common/fonts/NotoSansGurmukhi.ttf";

Font.register({
  family: "Noto Sans",
  format: "truetype",
  src: NotoSansBold,
});

Font.register({
  family: "Noto Sans Arabic",
  format: "truetype",
  src: NotoSansArabic,
});

Font.register({
  family: "Noto Sans Japanese",
  format: "opentype",
  src: NotoSansJapanese,
});

Font.register({
  family: "Noto Sans Korean",
  format: "opentype",
  src: NotoSansKorean,
});

Font.register({
  family: "Noto Sans Traditional Chinese",
  format: "opentype",
  src: NotoSansTraditionalChinese,
});

Font.register({
  family: "Noto Sans Simplified Chinese",
  format: "opentype",
  src: NotoSansSimplifiedChinese,
});

Font.register({
  family: "Noto Sans Thai",
  format: "truetype",
  src: NotoSansThai,
});

Font.register({
  family: "Noto Sans Tamil",
  format: "truetype",
  src: NotoSansTamil,
});

Font.register({
  family: "Noto Sans Malayalam",
  format: "truetype",
  src: NotoSansMalayalam,
});

Font.register({
  family: "Noto Sans Hebrew",
  format: "truetype",
  src: NotoSansHebrew,
});

Font.register({
  family: "Noto Sans Bengali",
  format: "truetype",
  src: NotoSansBengali,
});

Font.register({
  family: "Noto Sans Sinhala",
  format: "truetype",
  src: NotoSansSinhala,
});

Font.register({
  family: "Noto Sans Georgian",
  format: "truetype",
  src: NotoSansGeorgian,
});

Font.register({
  family: "Noto Sans Telugu",
  format: "truetype",
  src: NotoSansTelugu,
});

Font.register({
  family: "Noto Sans Armenian",
  format: "truetype",
  src: NotoSansArmenian,
});

Font.register({
  family: "Noto Sans Kannada",
  format: "truetype",
  src: NotoSansKannada,
});

Font.register({
  family: "Noto Sans Khmer",
  format: "truetype",
  src: NotoSansKhmer,
});

Font.register({
  family: "Noto Sans Oriya",
  format: "truetype",
  src: NotoSansOriya,
});

Font.register({
  family: "Noto Sans Gujarati",
  format: "truetype",
  src: NotoSansGujarati,
});

Font.register({
  family: "Noto Sans Thaana",
  format: "truetype",
  src: NotoSansThaana,
});

Font.register({
  family: "Noto Sans Lao",
  format: "truetype",
  src: NotoSansLao,
});

Font.register({
  family: "Noto Sans Myanmar",
  format: "truetype",
  src: NotoSansMyanmar,
});

Font.register({
  family: "Noto Sans Ethiopic",
  format: "truetype",
  src: NotoSansEthiopic,
});

Font.register({
  family: "Noto Sans Meetei Mayek",
  format: "truetype",
  src: NotoSansMeeteiMayek,
});

Font.register({
  family: "Noto Sans Gurmukhi",
  format: "truetype",
  src: NotoSansGurmukhi,
});

const styles = StyleSheet.create({
  body: {
    margin: "20px",
    padding: "20px",
    textAlign: "center",
  },
  data: {
    fontFamily: "Noto Sans",
    position: "relative",
  },
  logo: {
    height: "48px",
    width: "253px",
  },
  font: {
    position: "absolute",
    bottom: "0px",
    marginBottom: "20px",
    right: "0px",
    marginRight: "20px",
    fontFamily: "Noto Sans",
    fontSize: "8px",
  },
  heading: {
    fontFamily: "Noto Sans",
    fontWeight: "bold",
    fontSize: "30px",
    textAlign: "center",
  },
});

export const PdfDoc = ({
  translated,
  font,
  rightFlag,
  inputLanguage,
  outputLanguage,
}) => (
  <PDFDocument>
    <Page>
      <View style={styles.body}>
        <Image src={wordsack} style={styles.logo} />
        <Text style={styles.heading}>
          {"\n"}
          {inputLanguage.label}-to-{outputLanguage.label}
        </Text>
        <Text
          style={
            ([styles.data],
            { fontFamily: font, textAlign: rightFlag ? "right" : "left" })
          }
        >
          {!rightFlag && "\n~             "}
          {rightFlag && "\n"}
          {translated}
        </Text>
      </View>
      <View style={styles.font}>
        <Text>{`Font-Family: ${font}`}</Text>
      </View>
    </Page>
  </PDFDocument>
);
