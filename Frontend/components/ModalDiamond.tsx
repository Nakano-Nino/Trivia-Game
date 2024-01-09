// import React, { Dispatch, useState } from "react";
// import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
// import FontAwesome from "react-native-vector-icons/FontAwesome";

// const ModalDiamond = ({
//   visible,
//   toggleModalDiamond,
// }: {
//   visible: boolean;
//   toggleModalDiamond: Dispatch<React.SetStateAction<boolean>>;
// }) => {
//   return (
//     <Modal animationType="slide" transparent={true} visible={visible}>
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <View
//           style={{
//             backgroundColor: "#7752FE",
//             padding: 20,
//             borderRadius: 10,
//             elevation: 5,
//             height: 400,
//             width: 400,
//           }}
//         >
//           <TouchableOpacity
//             style={{}}
//             onPress={() => toggleModalDiamond(false)}
//           >
//             <FontAwesome
//               style={{
//                 color: "black",
//                 fontWeight: "bold",
//                 fontSize: 26,
//                 width: 100,
//               }}
//               name="times"
//               size={24}
//               color="black"
//             />
//           </TouchableOpacity>

//           <View>
//             <TouchableOpacity
//               style={{
//                 display: "flex",
//                 backgroundColor: "#C2D9FF",
//                 padding: 10,
//                 borderRadius: 17,
//                 marginTop: 20,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Text
//                 style={{
//                   color: "#0F1035",
//                   textAlign: "center",
//                   fontWeight: "bold",
//                   fontSize: 20,
//                   alignItems: "center",
//                   marginLeft: 10,
//                   alignContent: "center",
//                 }}
//               >
//                 Buy
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default ModalDiamond;
