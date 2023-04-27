import { Text, View } from "react-native";
import { Rating } from "react-native-elements";
import colors from "../vars/colors";
import spacing from "../vars/spacing";
import { useBookById } from "../services/booksService";
import { capitalizeFirstLetter } from "../utils/typography";

const BookRating = ({ rating, reviews }) => (
  <View
    style={{
      flex: 1,
      flexDirection: "row",
      gap: spacing.small,
      alignItems: "center",
    }}
  >
    <Rating readonly startingValue={rating} imageSize={18} />
    <Text>{reviews.length ? rating : "Nenhuma"}</Text>
  </View>
);

export default function useBookDetails(book) {
  const { data, isLoading, isError, refetch } = useBookById(book.id);

  const formattedDate = data?.publishing_date
    ? new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "long",
      }).format(new Date(data?.publishing_date))
    : null;
  const formattedPrice = data?.price
    ? Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(data?.price)
    : null;
  const ratingsSum =
    data?.reviews.reduce((sum, review) => sum + review.rating, 0) || 0;
  const rating = ratingsSum / data?.reviews.length || 0;

  const bookProps = [
    {
      label: "Avaliação",
      value: <BookRating rating={rating} reviews={data?.reviews} />,
    },
    { label: "Edição", value: data?.edition },
    { label: "Preço", value: formattedPrice },
    { label: "Número de páginas", value: data?.pages },
    { label: "Formato", value: data?.format },
    ...(formattedDate
      ? [
          {
            label: "Data de publicação",
            value: capitalizeFirstLetter(formattedDate),
          },
        ]
      : []),
    { label: "Roteiristas", value: data?.writers.join(", ") },
    { label: "Ilustradores", value: data?.illustrators.join(", ") },
    { label: "Editora", value: data?.publisher },
    { label: "Licenciado por", value: data?.licensor },
    {
      label: "ISBN",
      value: (
        <View
          style={{
            backgroundColor: colors.lightDark,
            padding: spacing.tiny,
            borderRadius: 5,
          }}
        >
          <Text>{data?.isbn}</Text>
        </View>
      ),
    },
  ];

  return { data, isLoading, isError, refetch, bookProps };
}
