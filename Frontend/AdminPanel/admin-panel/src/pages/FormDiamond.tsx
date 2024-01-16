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
  image: File | null
  amount: number
  price: number
}

interface FormDiamondProps {
  onCreate: (data: any) => void
}

const FormDiamond: React.FC<FormDiamondProps> = ({ onCreate }) => {
  const [formData, setFormData] = useState<FormData>({
    image: null,
    amount: 0,
    price: 0,
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? value : parseInt(value, 10),
    }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
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
    console.log("Form Data Submitted:", formData)
    try {
      setLoading(true)
      const formDataToSend = new FormData()
      formDataToSend.append("image", formData.image as File)
      formDataToSend.append("amount", formData.amount.toString())
      formDataToSend.append("price", formData.price.toString())

      const token = localStorage.getItem("token")

      if (!token) {
        console.error("Token not available")
        return
      }
      const response = await axios.post(
        "http://localhost:8000/api/diamonds",
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
        image: null,
        amount: 0,
        price: 0,
      })

      setPreviewImage(null)
    } catch (error) {
      console.error("Error creating data:", error)
    } finally {
      setLoading(false)
    }
  }
  console.log("Render with FormData:", formData)
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
            {previewImage && (
              <Image
                src={previewImage}
                alt="Image Preview"
                mt={2}
                width={100}
                height={100}
              />
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Amount"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" disabled={loading}>
            {loading ? "Uploading Data..." : "Upload Data"}
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default FormDiamond
