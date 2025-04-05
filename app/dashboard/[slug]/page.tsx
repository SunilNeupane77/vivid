// getting a dynamic value as a params
type Params = { slug: string };

export default async function SlugDashboard({ params }: { params: Params }) {
    const { slug } = await params;
    return (
        <>
            <h1>Sunil Neupane Slug Dashboard {slug}</h1>
        </>
    );
}