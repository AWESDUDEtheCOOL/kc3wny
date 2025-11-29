import DefaultMetaTags from '@components/DefaultMetaTags';

type HeadProps = {
  params: { [key: string]: string };
};

export default async function Head({ params }: HeadProps) {
  return (
    <>
      <DefaultMetaTags />
    </>
  );
}