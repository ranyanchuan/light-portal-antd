/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, BackTop, Select, Tag, Avatar, Tooltip } from 'antd';
import styles from './index.less';


const data = [
  {
    id: 'a',
    title: 'Annotating gene sets by mining large literature collections with protein networks',
    conf: 'PSB(2018)',
    org: ['EL', 'SCI', 'CCF'],
    source: 'http://psb.stanford.edu/psb-online/proceedings/psb18/wang_s.pdf',
    authors: [{
      id: 'a1',
      name: 'Wang Sheng',
    }, {
      id: 'a2',
      name: 'Ma Jianzhu',
    }, {
      id: 'a3',
      name: 'Yu Michael Ku',
    }, {
      id: 'a4',
      name: '韩家伟',
      src: 'https://am-cdn-s0.b0.upaiyun.com/upload/avatar/1852/642/1365/53f42f36dabfaedce54dcd0c.jpeg',
    }, {
      id: 'a5',
      name: '冉沿川',
    },
    ],
    abstract: ' Analysis of patient genomes and transcriptomes routinely recognizes new gene sets associated with human\n' +
      '          disease. Here we present an integrative natural language processing system which infers common functions for a\n' +
      '          gene set through automatic mining of the scientific literature with biological networks. This system links\n' +
      '          genes with associated literature phrases and combines these links with protein interactions in a single\n' +
      '          heterogeneous network. Multiscale functional annotations are inferred based on network distances between\n' +
      '          phrases and genes and then visualized as an ontology of biological concepts. To evaluate this system, we\n' +
      '          predict functions for gene sets representing known pathways and find that our approach achieves substantial\n' +
      '          improvement over the conventional text-mining baseline method. Moreover, our system discovers novel\n' +
      '          annotations for gene sets or pathways without previously known functions. Two case studies demonstrate how the\n' +
      '          system is used in discovery of new cancer-related pathways with ontological annotations.',
    keywords: ['Data Mining', 'Relational Database', 'Association Rule', 'Data Cube', 'Big Data', 'Machine Learning'],
  },
  {
    id: 'b',
    title: 'Annotating gene sets by mining large literature collections with protein networks',
    conf: 'PSB(2018)',
    org: ['EL', 'SCI', 'CCF'],
    source: 'http://psb.stanford.edu/psb-online/proceedings/psb18/wang_s.pdf',
    authors: [{
      id: 'b1',
      name: 'Wang Sheng',
    }, {
      id: 'b2',
      name: 'Ma Jianzhu',
    }, {
      id: 'b3',
      name: 'Yu Michael Ku',
    }, {
      id: 'b4',
      name: '韩家伟',
      src: 'https://am-cdn-s0.b0.upaiyun.com/upload/avatar/1852/642/1365/53f42f36dabfaedce54dcd0c.jpeg',
    }, {
      id: 'b5',
      name: '冉沿川',
    },
    ],
    abstract: ' Analysis of patient genomes and transcriptomes routinely recognizes new gene sets associated with human\n' +
      '          disease. Here we present an integrative natural language processing system which infers common functions for a\n' +
      '          gene set through automatic mining of the scientific literature with biological networks. This system links\n' +
      '          genes with associated literature phrases and combines these links with protein interactions in a single\n' +
      '          heterogeneous network. Multiscale functional annotations are inferred based on network distances between\n' +
      '          phrases and genes and then visualized as an ontology of biological concepts. To evaluate this system, we\n' +
      '          predict functions for gene sets representing known pathways and find that our approach achieves substantial\n' +
      '          improvement over the conventional text-mining baseline method. Moreover, our system discovers novel\n' +
      '          annotations for gene sets or pathways without previously known functions. Two case studies demonstrate how the\n' +
      '          system is used in discovery of new cancer-related pathways with ontological annotations.',
    keywords: ['Data Mining', 'Relational Database', 'Association Rule', 'Data Cube', 'Big Data', 'Machine Learning'],
  },
];

@Form.create()
class PaperList extends React.Component {
  render() {


    return (
      <div className={styles.paperList}>

        {data && data.length && data.map((paper, index) => {
          let { id, title, conf, org, source, authors, abstract, keywords, showSource = false } = paper;
          return (
            <div key={id} className={styles.paper}>
              <h3>{title}</h3>
              <div className={styles.paperBasic}>
                <div className={styles.paperItem}>
                  <Icon type="desktop" className={styles.paperIcon}/>
                  <Tag color="geekblue">{conf}</Tag>
                </div>
                <div className={styles.paperItem}>
                  <Icon type="solution" className={styles.paperIcon}/>
                  {org && org.length && org.map((item) => {
                    return (<Tag color="#87d068" key={item}>{item}</Tag>);
                  })}
                </div>
                <div className={styles.paperItem}>
                  <Icon type="global" className={styles.paperIcon}/>
                  <a href={source} className={styles.sourceHref}>{source}</a>
                </div>
              </div>
              <div className={styles.team}>
                <Icon type="team" className={styles.paperIcon}/>
                {authors && authors.length && authors.map((author) => {
                  const { id, src, name } = author;
                  return (
                    <Tooltip placement="bottom" title={name} key={id}>
                        <span className={styles.teamAvatar}>
                          {src ? <Avatar src={src}/> :
                            <Avatar style={{ color: '#fff', backgroundColor: '#00a2ae' }}>{name.slice(0, 1)}</Avatar>
                          }
                        </span>
                    </Tooltip>
                  );
                })}
              </div>
              <div className={styles.abstract} style={{ WebkitBoxOrient: 'vertical' }}>{abstract}</div>
              <div className={styles.tags}>
                {keywords && keywords.length && keywords.map((keyword) => {
                  return (
                    <Tag key={keyword}>{keyword}</Tag>
                  );
                })}
              </div>
            </div>
          );

        })}


      </div>
    );
  }
}

export default PaperList;
