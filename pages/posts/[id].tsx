import {GetStaticProps} from 'next';
import Head from 'next/head';
import Layout from '../../components/layout';
import {getAllPostIds, getPostData, PostDataContent} from '../../lib/posts';
import Date from '../../components/Date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({
    postData: {title, date, contentHtml},
}: {
    postData: PostDataContent;
}) {
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={date} />
                </div>
                <div dangerouslySetInnerHTML={{__html: contentHtml}} />
            </article>
        </Layout>
    );
}
export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    if (
        params === undefined ||
        params.id === undefined ||
        typeof params.id !== 'string'
    )
        return {props: {}};
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
};
