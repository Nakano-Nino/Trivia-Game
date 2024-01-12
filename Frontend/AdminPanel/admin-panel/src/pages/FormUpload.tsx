import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Image,
} from "@chakra-ui/react"
import axios from "axios"
import { ChangeEvent, FormEvent, useState } from "react"
import Swal from "sweetalert2"
interface FormData {
  avatar: File | null
  price: number
}
interface FormUploadProps {
  onCreate: (data: any) => void
}

const FormUpload: React.FC<FormUploadProps> = ({ onCreate }) => {
  const [formData, setFormData] = useState<FormData>({
    avatar: null,
    price: 0,
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        avatar: file,
      }))

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("avatar", formData.avatar as File)
      formDataToSend.append("price", formData.price.toString())
      const token = localStorage.getItem("token")

      if (!token) {
        // Handle case when token is not available
        console.error("Token not available")
        return
      }
      const response = await axios.post(
        "http://localhost:8000/api/avatars",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      Swal.fire({
        icon: "success",
        title: "Upload Successful!",
        showConfirmButton: false,
        timer: 1500,
      })
      onCreate(response.data)
      setFormData({
        avatar: null,
        price: 0,
      })
      setPreviewImage(null)
    } catch (error) {
      console.error("Error creating data:", error)
    }
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Avatar</FormLabel>
            <Input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
            />
            {previewImage && (
              <Image src={previewImage} alt="Avatar Preview" mt={2} />
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Dalam Rp"
            />
          </FormControl>

          <Button type="submit" colorScheme="teal">
            Upload Data
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default FormUpload
