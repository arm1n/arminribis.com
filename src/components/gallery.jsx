import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Link } from 'gatsby';

import {
    roundNumber, 
    aspectRatio
} from '../utils/math';

import styles from './gallery.module.scss';

const DEFAULT_MARGIN = 5;

//
// PHOTO
//
export const Photo = ({ path, height, width, margin, fluid }) => {
    const style = { width, height, margin };

    return (
        <Link
          to={path}
          style={style}
          className={styles.photo}>
          <Img
            fluid={fluid} 
            className={styles.image} />
        </Link>
    );
};

Photo.defaultProps = {
    margin: DEFAULT_MARGIN
};

Photo.propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    fluid: PropTypes.shape({
        aspectRatio: PropTypes.number.isRequired,
        base64: PropTypes.string.isRequired,
        srcSet: PropTypes.string.isRequired,
        sizes: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
    }),
    caption: PropTypes.string,
    margin: PropTypes.number
};

//
// GALLERY
//
class Gallery extends Component {
    contentRef = React.createRef()

    state = {
        columns: 1,
        containerWidth: 0
    }

    _calculateState = () => {
        const { current } = this.contentRef;
        const { photos } = this.props;
        if (!current || !photos) {
            return;
        }

        let {
            offsetWidth: containerWidth
        } = current;
        let columns = 1;

        // rounding issues
        containerWidth -= 1;

        if (containerWidth >= 500) {
            columns = 2;
        }

        if (containerWidth >= 900) {
            columns = 3;
        }

        if (containerWidth >= 1500) {
            columns = 4;
        }

        this.setState({ containerWidth, columns });
    }

    _processPhotos = () => {
        const {
            props: {
                photos,
                margin,
                getPath
            },
            state: {
                columns,
                containerWidth
            }
        } = this;
        const ratios = [];

        // now container width given yet, provide empty collection
        if (containerWidth === 0) {
            return [];
        }

        // divide photos over rows, max cells based on `columns`
        // finally resulting in: [[0, 1, 2], [3, 4, 5], [6, 7]]
        let rows = photos.reduce((rows, cell, idx) => {
            const row = ~~(idx / columns);

            rows[row] = !rows[row]
                ? [cell]
                : [
                    ...rows[row], 
                    cell
                ];

            return rows;
        }, []);

        // calculate total ratio of rows / change each photo size        
        rows = rows.map((row, index) => {
            // 
            // ratio
            // 
            const ratio = row.reduce((ratio, photo) => {
                return ratio + aspectRatio(photo);
            }, 0);

            if (index !== rows.length - 1) {
                ratios.push(ratio);
            }

            //
            // width
            //
            const width = containerWidth - (2 * margin) * row.length;

            // 
            // height
            // 
            // a) regular row where row.length === columns: row width / total ratio
            // b) if columns > row.length && if !lastRow: avg ratio of previous row
            // c) all photos are on a single row
            // 
            const height = row.length === columns
                ? width / ratio
                : photos.length < columns
                    ? width / ratio * (row.length / columns)
                    : width / (
                        ratios.reduce((total, item) => {
                            return total + item;
                        }, 0) / (rows.length - 1)
                    );

            return row.map((photo) => {
                return {
                    ...photo,
                    ...{
                        margin,
                        path: getPath(photo),
                        height: roundNumber(height, 1),
                        width: roundNumber(height * aspectRatio(photo), 1)
                    }
                };
            });
        });

        // merge all rows with calculated sized to a flat array
        return rows.reduce((rows, row) => [...rows, ...row], []);
    }

    componentDidMount = () => {
        window.addEventListener('resize', this._calculateState);
        this._calculateState();
    }

    componentDidUpdate = ({ photos: prevPhotos }) => {
        if (prevPhotos === this.props.photos) {
            return;
        }

        this._calculateState();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._calculateState);
    }

    render() {
        const {
            props: {
                margin
            }
        } = this;
        const style = { margin: -margin };
        const photos = this._processPhotos();

        return (
            <div 
                style={style}
                ref={this.contentRef}
                className={styles.gallery}>
                {photos.map((photo) => 
                    <Photo key={photo.id} {...photo} />
                )}
            </div>
        );
    }
};

Gallery.defaultProps = {
    margin: DEFAULT_MARGIN,
};

Gallery.propTypes = {
    getPath: PropTypes.func.isRequired,
    margin: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(
        PropTypes.shape(Photo.propTypes)
    ).isRequired
};

export default Gallery;