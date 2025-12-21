
const BookingBage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  console.log("book", id)
    return (
        <div>
            <h1>Booking</h1>
        </div>
    );
};

export default BookingBage;