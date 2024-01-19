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
  image_question: File | null
  A: string
  B: string
  C: string
  D: string
  answer: string
}

interface FormUploadProps {
  onCreate: (data: any) => void
}

const FormQuestions: React.FC<FormUploadProps> = ({ onCreate }) => {
  const [formData, setFormData] = useState<FormData>({
    image_question: null,
    A: "",
    B: "",
    C: "",
    D: "",
    answer: "",
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

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
        image_question: file,
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
      setLoading(true)
      const token = localStorage.getItem("token")

      if (!token) {
        console.error("Token not available")
        return
      }
      const formDataToSend = new FormData()
      formDataToSend.append("image_question", formData.image_question as File)
      formDataToSend.append("A", formData.A)
      formDataToSend.append("B", formData.B)
      formDataToSend.append("C", formData.C)
      formDataToSend.append("D", formData.D)
      formDataToSend.append("answer", formData.answer)

      const response = await axios.post(
        "http://localhost:8000/api/questions",
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
        image_question: null,
        A: "",
        B: "",
        C: "",
        D: "",
        answer: "",
      })

      setPreviewImage(null)
    } catch (error) {
      console.error("Error creating data:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      className="w-full max-w-lg mt-10"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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
              <Image src={previewImage} alt="Image Preview" mt={2} />
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Options</FormLabel>
            <Input
              type="text"
              name="A"
              value={formData.A}
              onChange={handleInputChange}
              placeholder="Option A"
            />
            <Input
              type="text"
              name="B"
              value={formData.B}
              onChange={handleInputChange}
              placeholder="Option B"
            />
            <Input
              type="text"
              name="C"
              value={formData.C}
              onChange={handleInputChange}
              placeholder="Option C"
            />
            <Input
              type="text"
              name="D"
              value={formData.D}
              onChange={handleInputChange}
              placeholder="Option D"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Answer</FormLabel>
            <Input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleInputChange}
              placeholder="Answer"
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

export default FormQuestions
