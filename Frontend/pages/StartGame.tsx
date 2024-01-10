// import React from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import Avatar from "../components/Avatar";
import { StatusBar } from "expo-status-bar";
import { FaEdit } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

interface DataAvatar {
  id: string;
  name: string;
  imageUrl: string;
}

const StartGame = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [coba, cobain] = useState(false);
  const toggleModalDiamond = () => {
    cobain(!coba);
  };
  const toggleProfileEdit = () => {
    setModalVisible(!isModalVisible);
  };
  const data: DataAvatar[] = [
    { id: "1", name: "John", imageUrl: "../assets/avatar1.png" },
  ];

  const renderAvatar = ({ item }: { item: DataAvatar }) => (
    <Avatar imageUrl={item.imageUrl} name={item.name} />
  );

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require("../assets/bg2.png")} />
      <Image style={styles.logo1} source={require("../assets/logo1.png")} />
      <StatusBar style="auto" />
      <View style={styles.diamondContainer}>
        <View style={styles.diamondButton}>
          <Text style={styles.diamondText}>20</Text>
        </View>

        <TouchableOpacity onPress={toggleModalDiamond}>
          <Image
            style={styles.vectordiamond}
            source={require("../assets/adddiamondpng.png")}
          />
        </TouchableOpacity>

        <Image
          style={styles.diamond}
          source={require("../assets/diamond.png")}
        />
      </View>
      <View>
        <Image
          style={styles.avatar}
          source={require("../assets/avatar1.png")}
        />
        <TouchableOpacity style={styles.edit} onPress={toggleProfileEdit}>
          <FaEdit />
        </TouchableOpacity>
        <Text style={styles.textup}>Mazyk Breng</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Play Game</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={coba}
        onRequestClose={toggleModalDiamond}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={toggleModalDiamond}
            >
              <FontAwesome
                style={styles.modalButtonText}
                name="times"
                size={24}
                color="black"
                width={100}
              />
            </TouchableOpacity>

            <View style={styles.modalDiamond}>
              <View style={styles.rowContainer}>
                <Text style={styles.listDiamond}>100</Text>
                <TouchableOpacity>
                  <Image
                    style={styles.imageDiamondPrice}
                    source={require("../assets/Diamond1.png")}
                  />
                  <Text style={styles.PriceDiamond}>Rp. 16.000 </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.listDiamond}>250</Text>
                <TouchableOpacity>
                  <Image
                    style={styles.imageDiamondPrice}
                    source={require("../assets/Diamond2.png")}
                  />
                  <Text style={styles.PriceDiamond}>Rp. 13.000 </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.listDiamond}>500</Text>
                <TouchableOpacity>
                  <Image
                    style={styles.imageDiamondPrice}
                    source={require("../assets/Diamond3.png")}
                  />
                  <Text style={styles.PriceDiamond}>Rp. 516.000 </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.listDiamond}>1000</Text>
                <TouchableOpacity>
                  <Image
                    style={styles.imageDiamondPrice}
                    source={require("../assets/Diamond4.png")}
                  />
                  <Text style={styles.PriceDiamond}>Rp. 516.000 </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.listDiamond}>5000</Text>
                <TouchableOpacity>
                  <Image
                    style={styles.imageDiamondPrice}
                    source={require("../assets/Diamond5.png")}
                  />
                  <Text style={styles.PriceDiamond}>Rp. 516.000 </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.listDiamond}>10000</Text>
                <TouchableOpacity>
                  <Image
                    style={styles.imageDiamondPrice}
                    source={require("../assets/Diamond6.png")}
                  />
                  <Text style={styles.PriceDiamond}>Rp. 516.000 </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.buttondiamond}>
                <Text style={styles.textdiamond}>Buy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleProfileEdit}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={toggleProfileEdit}
            >
              <FontAwesome
                style={styles.modalButtonText}
                name="times"
                size={24}
                color="black"
                width={100}
              />
            </TouchableOpacity>

            <View style={styles.modalAvatar}>
              <View style={styles.viewAvatar}>
              <TouchableOpacity>
                <Image
                  style={styles.imageAvatar}
                  source={require("../assets/avatar1.png")}
                />
                <Text style={styles.priceDiamondAvatar}>Free</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.viewAvatar}>
              <TouchableOpacity>
                <Image
                  style={styles.imageAvatar}
                  source={require("../assets/avatar2.png")}
                />
                <Text style={styles.priceDiamondAvatar}>Free</Text>
              </TouchableOpacity>
              </View>
              <View style={styles.viewAvatar}>
              <TouchableOpacity>
                <Image
                  style={styles.imageAvatar}
                  source={require("../assets/avatar3.png")}
                />
                <Text style={styles.priceDiamondAvatar}>Free</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.viewAvatar}>
              <TouchableOpacity>
                <Image
                  style={styles.imageAvatar}
                  source={require("../assets/Vip1.png")}
                />
                <Text style={styles.priceDiamondAvatar}>
                  25{" "}
                  <Image
                    style={styles.imageDiamond}
                    source={require("../assets/diamond.png")}
                  />
                </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.viewAvatar}>
              <TouchableOpacity>
                <Image
                  style={styles.imageAvatar}
                  source={require("../assets/Vip2.png")}
                />
                <Text style={styles.priceDiamondAvatar}>
                  25{" "}
                  <Image
                    style={styles.imageDiamond}
                    source={require("../assets/diamond.png")}
                  />
                </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.viewAvatar}>
              <TouchableOpacity>
                <Image
                  style={styles.imageAvatar}
                  source={require("../assets/Vip3.png")}
                />
                <Text style={styles.priceDiamondAvatar}>
                  25{" "}
                  <Image
                    style={styles.imageDiamond}
                    source={require("../assets/diamond.png")}
                  />
                </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.buttondiamond}>
                <Text style={styles.textdiamond}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Image style={styles.artist} source={require("../assets/artist.png")} />
    </View>
  );
};

export default StartGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  logo1: {
    width: 230,
    height: 230,
    position: "relative",
    marginTop: -280,
    marginRight: 200,
  },

  //set diamond start
  diamondContainer: {
    position: "absolute",
    top: 20,
    marginLeft: 280,
  },
  vectordiamond: {
    width: 30,
    height: 30,
    top: -21,
    marginLeft: 65,
  },
  diamond: {
    width: 25,
    height: 25,
    top: -53,
    marginLeft: -8,
  },
  diamondButton: {
    backgroundColor: "#000000",
    padding: 10,
    width: 80,
    height: 15,
    borderRadius: 17,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  diamondText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },

  //set diamond end
  textup: {
    fontSize: 20,
    marginBottom: 10,
    top: 5,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",

  },
  button: {
    backgroundColor: "#5ce1e6",
    padding: 10,
    width: 300,
    height: 50,
    borderRadius: 17,
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#F2F2F2",
    position: "relative",
  },
  text: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "center",
    marginLeft: 10,
    alignContent: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 2,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 40,
    marginBottom: 5,
  },
  edit: {
    position: "absolute",
    top: 60,
    left: 130,
    fontSize: 30,
    color: "white",
    
  },
  artist: {
    position: "absolute",
    width: 430,
    height: 190,
    marginTop: "132%",
  },

  // modal edit start
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    height: 480,
    width: 400,
  },
  modalText: {
    fontSize: 18,

    marginBottom: 20,
  },
  modalButton: {
    padding: 1,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    height: 30,
    width: 30,
    marginTop: -10,
    marginLeft: 340,
  },
  modalButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 26,
  },

  container1: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  listDiamond: {
    color: "white",
    fontSize: 15,
    // top: -10,
    // left: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  imageDiamondPrice: {
       width: 90,
    height: 90,
    left: 10,
    top: 2,
  },
  imageAvatar: {
    width: 120,
    height: 120,
    top: 2,
    right: 5,
  },
  PriceDiamond: {
    color: "white",
    fontSize: 15,
    top: 95,
    // textAlign: "center",
    left: 11,
    fontWeight: "bold",
    position: "absolute",
  },
  priceDiamondAvatar: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
  },
  imageDiamond: {
    width: 20,
    height: 20,
    top: 2,
  },
  rowContainer: {
    width: 110,
    height: 110,
    borderRadius: 5,
    marginBottom: 60,
    backgroundColor: "black",
  },
  viewAvatar: {
    width: 110,
    height: 110,
    borderRadius: 5,
    marginBottom: 60,
    backgroundColor: "black",
  },
  modalDiamond: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 0,
    marginTop: 20,
  },
  modalAvatar: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 0,
    marginTop: 20,
  },
  buttondiamond: {
    display: "flex",
    backgroundColor: "#864AF9",
    padding: 10,
    borderRadius: 17,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textdiamond: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "center",
    marginLeft: 10,
    alignContent: "center",
  },
});
