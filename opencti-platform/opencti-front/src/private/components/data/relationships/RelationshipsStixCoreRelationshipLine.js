import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import withStyles from '@mui/styles/withStyles';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { compose, pathOr } from 'ramda';
import Skeleton from '@mui/material/Skeleton';
import { Link } from 'react-router-dom';
import { KeyboardArrowRight } from '@mui/icons-material';
import inject18n from '../../../../components/i18n';
import ItemIcon from '../../../../components/ItemIcon';
import ItemMarkings from '../../../../components/ItemMarkings';
import { defaultValue } from '../../../../utils/Graph';
import { resolveLink } from '../../../../utils/Entity';

const styles = (theme) => ({
  item: {
    paddingLeft: 10,
    height: 50,
  },
  itemIcon: {
    color: theme.palette.primary.main,
  },
  bodyItem: {
    height: 20,
    fontSize: 13,
    float: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: 5,
  },
  goIcon: {
    position: 'absolute',
    right: -10,
  },
  itemIconDisabled: {
    color: theme.palette.grey[700],
  },
  placeholder: {
    display: 'inline-block',
    height: '1em',
    backgroundColor: theme.palette.grey[700],
  },
});

class RelationshipsStixCoreRelationshipLineComponent extends Component {
  render() {
    const { t, fd, classes, dataColumns, node } = this.props;
    const remoteNode = node.from ? node.from : node.to;
    let link = null;
    if (remoteNode) {
      link = `${resolveLink(remoteNode.entity_type)}/${
        remoteNode.id
      }/knowledge/relations/${node.id}`;
    }
    return (
      <ListItem
        classes={{ root: classes.item }}
        divider={true}
        button={true}
        component={Link}
        to={link}
        disabled={link === null}
      >
        <ListItemIcon classes={{ root: classes.itemIcon }}>
          <ItemIcon type={node.entity_type} />
        </ListItemIcon>
        <ListItemText
          primary={
            <div>
              <div
                className={classes.bodyItem}
                style={{ width: dataColumns.fromType.width, display: 'flex' }}
              >
                <ItemIcon type={node.from.entity_type} variant="inline" />
                {node.from
                  ? t(`entity_${node.from.entity_type}`)
                  : t('Restricted')}
              </div>
              <div
                className={classes.bodyItem}
                style={{ width: dataColumns.fromName.width }}
              >
                <code>
                  {node.from ? defaultValue(node.from, true) : t('Restricted')}
                </code>
              </div>
              <div
                className={classes.bodyItem}
                style={{ width: dataColumns.relationship_type.width }}
              >
                <i>{t(`relationship_${node.relationship_type}`)}</i>
              </div>
              <div
                className={classes.bodyItem}
                style={{ width: dataColumns.toType.width, display: 'flex' }}
              >
                <ItemIcon type={node.to.entity_type} variant="inline" />
                {node.to ? t(`entity_${node.to.entity_type}`) : t('Restricted')}
              </div>
              <div
                className={classes.bodyItem}
                style={{ width: dataColumns.toName.width }}
              >
                <code>
                  {node.to ? defaultValue(node.to, true) : t('Restricted')}
                </code>
              </div>
              <div
                className={classes.bodyItem}
                style={{ width: dataColumns.created_at.width }}
              >
                {fd(node.created_at)}
              </div>
              <div
                className={classes.bodyItem}
                style={{ width: dataColumns.createdBy.width }}
              >
                {pathOr('', ['createdBy', 'name'], node)}
              </div>
              <div
                className={classes.bodyItem}
                style={{ width: dataColumns.objectMarking.width }}
              >
                <ItemMarkings
                  markingDefinitions={pathOr(
                    [],
                    ['objectMarking', 'edges'],
                    node,
                  )}
                  limit={1}
                  variant="inList"
                />
              </div>
            </div>
          }
        />
        <ListItemIcon classes={{ root: classes.goIcon }}>
          <KeyboardArrowRight />
        </ListItemIcon>
      </ListItem>
    );
  }
}

RelationshipsStixCoreRelationshipLineComponent.propTypes = {
  dataColumns: PropTypes.object,
  node: PropTypes.object,
  classes: PropTypes.object,
  fd: PropTypes.func,
  t: PropTypes.func,
  onLabelClick: PropTypes.func,
};

const RelationshipsStixCoreRelationshipLineFragment = createFragmentContainer(
  RelationshipsStixCoreRelationshipLineComponent,
  {
    node: graphql`
      fragment RelationshipsStixCoreRelationshipLine_node on StixCoreRelationship {
        id
        entity_type
        parent_types
        relationship_type
        confidence
        start_time
        stop_time
        description
        fromRole
        toRole
        created_at
        updated_at
        is_inferred
        createdBy {
          ... on Identity {
            name
          }
        }
        objectMarking {
          edges {
            node {
              id
              definition
              x_opencti_color
            }
          }
        }
        objectLabel {
          edges {
            node {
              id
              value
              color
            }
          }
        }
        x_opencti_inferences {
          rule {
            id
            name
            description
          }
          explanation {
            ... on BasicObject {
              id
              entity_type
              parent_types
            }
            ... on BasicRelationship {
              id
              entity_type
              parent_types
            }
            ... on StixCoreObject {
              created_at
            }
            ... on AttackPattern {
              name
            }
            ... on Campaign {
              name
            }
            ... on CourseOfAction {
              name
            }
            ... on Individual {
              name
            }
            ... on Organization {
              name
            }
            ... on Sector {
              name
            }
            ... on System {
              name
            }
            ... on Indicator {
              name
            }
            ... on Infrastructure {
              name
            }
            ... on IntrusionSet {
              name
            }
            ... on Position {
              name
            }
            ... on City {
              name
            }
            ... on Country {
              name
            }
            ... on Region {
              name
            }
            ... on Malware {
              name
            }
            ... on ThreatActor {
              name
            }
            ... on Tool {
              name
            }
            ... on Vulnerability {
              name
            }
            ... on Incident {
              name
            }
            ... on StixCoreRelationship {
              id
              relationship_type
              created_at
              start_time
              stop_time
              created
              from {
                ... on BasicObject {
                  id
                  entity_type
                  parent_types
                }
                ... on BasicRelationship {
                  id
                  entity_type
                  parent_types
                }
                ... on StixCoreObject {
                  created_at
                }
                ... on StixCoreRelationship {
                  relationship_type
                  created_at
                  start_time
                  stop_time
                  created
                }
                ... on AttackPattern {
                  name
                }
                ... on Campaign {
                  name
                }
                ... on CourseOfAction {
                  name
                }
                ... on Individual {
                  name
                }
                ... on Organization {
                  name
                }
                ... on Sector {
                  name
                }
                ... on System {
                  name
                }
                ... on Indicator {
                  name
                }
                ... on Infrastructure {
                  name
                }
                ... on IntrusionSet {
                  name
                }
                ... on Position {
                  name
                }
                ... on City {
                  name
                }
                ... on Country {
                  name
                }
                ... on Region {
                  name
                }
                ... on Malware {
                  name
                }
                ... on ThreatActor {
                  name
                }
                ... on Tool {
                  name
                }
                ... on Vulnerability {
                  name
                }
                ... on Incident {
                  name
                }
                ... on StixCyberObservable {
                  observable_value
                }
                ... on ObservedData {
                  objects(first: 1) {
                    edges {
                      node {
                        ... on StixCoreObject {
                          id
                          entity_type
                          parent_types
                          created_at
                          createdBy {
                            ... on Identity {
                              id
                              name
                              entity_type
                            }
                          }
                          objectMarking {
                            edges {
                              node {
                                id
                                definition
                              }
                            }
                          }
                        }
                        ... on AttackPattern {
                          name
                          description
                          x_mitre_id
                        }
                        ... on Campaign {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on Note {
                          attribute_abstract
                        }
                        ... on ObservedData {
                          first_observed
                          last_observed
                        }
                        ... on Opinion {
                          opinion
                        }
                        ... on Report {
                          name
                          description
                          published
                        }
                        ... on CourseOfAction {
                          name
                          description
                        }
                        ... on Individual {
                          name
                          description
                        }
                        ... on Organization {
                          name
                          description
                        }
                        ... on Sector {
                          name
                          description
                        }
                        ... on System {
                          name
                          description
                        }
                        ... on Indicator {
                          name
                          description
                          valid_from
                        }
                        ... on Infrastructure {
                          name
                          description
                        }
                        ... on IntrusionSet {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on Position {
                          name
                          description
                        }
                        ... on City {
                          name
                          description
                        }
                        ... on Country {
                          name
                          description
                        }
                        ... on Region {
                          name
                          description
                        }
                        ... on Malware {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on ThreatActor {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on Tool {
                          name
                          description
                        }
                        ... on Vulnerability {
                          name
                          description
                        }
                        ... on Incident {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on StixCyberObservable {
                          observable_value
                          x_opencti_description
                        }
                      }
                    }
                  }
                }
                ... on StixCoreRelationship {
                  id
                  entity_type
                  relationship_type
                  start_time
                  stop_time
                  created
                  from {
                    ... on BasicObject {
                      id
                      entity_type
                    }
                    ... on BasicRelationship {
                      id
                      entity_type
                    }
                    ... on StixCoreObject {
                      created_at
                    }
                    ... on StixCoreRelationship {
                      created_at
                      start_time
                      stop_time
                      created
                    }
                    ... on AttackPattern {
                      name
                    }
                    ... on Campaign {
                      name
                    }
                    ... on CourseOfAction {
                      name
                    }
                    ... on Individual {
                      name
                    }
                    ... on Organization {
                      name
                    }
                    ... on Sector {
                      name
                    }
                    ... on System {
                      name
                    }
                    ... on Indicator {
                      name
                    }
                    ... on Infrastructure {
                      name
                    }
                    ... on IntrusionSet {
                      name
                    }
                    ... on Position {
                      name
                    }
                    ... on City {
                      name
                    }
                    ... on Country {
                      name
                    }
                    ... on Region {
                      name
                    }
                    ... on Malware {
                      name
                    }
                    ... on ThreatActor {
                      name
                    }
                    ... on Tool {
                      name
                    }
                    ... on Vulnerability {
                      name
                    }
                    ... on Incident {
                      name
                    }
                  }
                  to {
                    ... on BasicObject {
                      id
                      entity_type
                    }
                    ... on BasicRelationship {
                      id
                      entity_type
                    }
                    ... on StixCoreObject {
                      created_at
                    }
                    ... on StixCoreRelationship {
                      created_at
                      start_time
                      stop_time
                      created
                    }
                    ... on AttackPattern {
                      name
                    }
                    ... on Campaign {
                      name
                    }
                    ... on CourseOfAction {
                      name
                    }
                    ... on Individual {
                      name
                    }
                    ... on Organization {
                      name
                    }
                    ... on Sector {
                      name
                    }
                    ... on System {
                      name
                    }
                    ... on Indicator {
                      name
                    }
                    ... on Infrastructure {
                      name
                    }
                    ... on IntrusionSet {
                      name
                    }
                    ... on Position {
                      name
                    }
                    ... on City {
                      name
                    }
                    ... on Country {
                      name
                    }
                    ... on Region {
                      name
                    }
                    ... on Malware {
                      name
                    }
                    ... on ThreatActor {
                      name
                    }
                    ... on Tool {
                      name
                    }
                    ... on Vulnerability {
                      name
                    }
                    ... on Incident {
                      name
                    }
                    ... on ObservedData {
                      objects(first: 1) {
                        edges {
                          node {
                            ... on StixCoreObject {
                              id
                              entity_type
                              parent_types
                              created_at
                              createdBy {
                                ... on Identity {
                                  id
                                  name
                                  entity_type
                                }
                              }
                              objectMarking {
                                edges {
                                  node {
                                    id
                                    definition
                                  }
                                }
                              }
                            }
                            ... on AttackPattern {
                              name
                              description
                              x_mitre_id
                            }
                            ... on Campaign {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Note {
                              attribute_abstract
                            }
                            ... on ObservedData {
                              first_observed
                              last_observed
                            }
                            ... on Opinion {
                              opinion
                            }
                            ... on Report {
                              name
                              description
                              published
                            }
                            ... on CourseOfAction {
                              name
                              description
                            }
                            ... on Individual {
                              name
                              description
                            }
                            ... on Organization {
                              name
                              description
                            }
                            ... on Sector {
                              name
                              description
                            }
                            ... on System {
                              name
                              description
                            }
                            ... on Indicator {
                              name
                              description
                              valid_from
                            }
                            ... on Infrastructure {
                              name
                              description
                            }
                            ... on IntrusionSet {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Position {
                              name
                              description
                            }
                            ... on City {
                              name
                              description
                            }
                            ... on Country {
                              name
                              description
                            }
                            ... on Region {
                              name
                              description
                            }
                            ... on Malware {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on ThreatActor {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Tool {
                              name
                              description
                            }
                            ... on Vulnerability {
                              name
                              description
                            }
                            ... on Incident {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on StixCyberObservable {
                              observable_value
                              x_opencti_description
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              to {
                ... on BasicObject {
                  id
                  entity_type
                  parent_types
                }
                ... on BasicRelationship {
                  id
                  entity_type
                  parent_types
                }
                ... on StixCoreObject {
                  created_at
                }
                ... on StixCoreRelationship {
                  created_at
                  relationship_type
                  start_time
                  stop_time
                  created
                }
                ... on AttackPattern {
                  name
                }
                ... on Campaign {
                  name
                }
                ... on CourseOfAction {
                  name
                }
                ... on Individual {
                  name
                }
                ... on Organization {
                  name
                }
                ... on Sector {
                  name
                }
                ... on System {
                  name
                }
                ... on Indicator {
                  name
                }
                ... on Infrastructure {
                  name
                }
                ... on IntrusionSet {
                  name
                }
                ... on Position {
                  name
                }
                ... on City {
                  name
                }
                ... on Country {
                  name
                }
                ... on Region {
                  name
                }
                ... on Malware {
                  name
                }
                ... on ThreatActor {
                  name
                }
                ... on Tool {
                  name
                }
                ... on Vulnerability {
                  name
                }
                ... on Incident {
                  name
                }
                ... on StixCyberObservable {
                  observable_value
                }
                ... on ObservedData {
                  objects(first: 1) {
                    edges {
                      node {
                        ... on StixCoreObject {
                          id
                          entity_type
                          parent_types
                          created_at
                          createdBy {
                            ... on Identity {
                              id
                              name
                              entity_type
                            }
                          }
                          objectMarking {
                            edges {
                              node {
                                id
                                definition
                              }
                            }
                          }
                        }
                        ... on AttackPattern {
                          name
                          description
                          x_mitre_id
                        }
                        ... on Campaign {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on Note {
                          attribute_abstract
                        }
                        ... on ObservedData {
                          first_observed
                          last_observed
                        }
                        ... on Opinion {
                          opinion
                        }
                        ... on Report {
                          name
                          description
                          published
                        }
                        ... on CourseOfAction {
                          name
                          description
                        }
                        ... on Individual {
                          name
                          description
                        }
                        ... on Organization {
                          name
                          description
                        }
                        ... on Sector {
                          name
                          description
                        }
                        ... on System {
                          name
                          description
                        }
                        ... on Indicator {
                          name
                          description
                          valid_from
                        }
                        ... on Infrastructure {
                          name
                          description
                        }
                        ... on IntrusionSet {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on Position {
                          name
                          description
                        }
                        ... on City {
                          name
                          description
                        }
                        ... on Country {
                          name
                          description
                        }
                        ... on Region {
                          name
                          description
                        }
                        ... on Malware {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on ThreatActor {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on Tool {
                          name
                          description
                        }
                        ... on Vulnerability {
                          name
                          description
                        }
                        ... on Incident {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on StixCyberObservable {
                          observable_value
                          x_opencti_description
                        }
                      }
                    }
                  }
                }
                ... on StixCoreRelationship {
                  id
                  entity_type
                  relationship_type
                  start_time
                  stop_time
                  created
                  from {
                    ... on BasicObject {
                      id
                      entity_type
                      parent_types
                    }
                    ... on BasicRelationship {
                      id
                      entity_type
                      parent_types
                    }
                    ... on StixCoreObject {
                      created_at
                    }
                    ... on StixCoreRelationship {
                      created_at
                      start_time
                      stop_time
                      created
                    }
                    ... on AttackPattern {
                      name
                    }
                    ... on Campaign {
                      name
                    }
                    ... on CourseOfAction {
                      name
                    }
                    ... on Individual {
                      name
                    }
                    ... on Organization {
                      name
                    }
                    ... on Sector {
                      name
                    }
                    ... on System {
                      name
                    }
                    ... on Indicator {
                      name
                    }
                    ... on Infrastructure {
                      name
                    }
                    ... on IntrusionSet {
                      name
                    }
                    ... on Position {
                      name
                    }
                    ... on City {
                      name
                    }
                    ... on Country {
                      name
                    }
                    ... on Region {
                      name
                    }
                    ... on Malware {
                      name
                    }
                    ... on ThreatActor {
                      name
                    }
                    ... on Tool {
                      name
                    }
                    ... on Vulnerability {
                      name
                    }
                    ... on Incident {
                      name
                    }
                    ... on StixCyberObservable {
                      observable_value
                    }
                    ... on ObservedData {
                      objects(first: 1) {
                        edges {
                          node {
                            ... on StixCoreObject {
                              id
                              entity_type
                              parent_types
                              created_at
                              createdBy {
                                ... on Identity {
                                  id
                                  name
                                  entity_type
                                }
                              }
                              objectMarking {
                                edges {
                                  node {
                                    id
                                    definition
                                  }
                                }
                              }
                            }
                            ... on AttackPattern {
                              name
                              description
                              x_mitre_id
                            }
                            ... on Campaign {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Note {
                              attribute_abstract
                            }
                            ... on ObservedData {
                              first_observed
                              last_observed
                            }
                            ... on Opinion {
                              opinion
                            }
                            ... on Report {
                              name
                              description
                              published
                            }
                            ... on CourseOfAction {
                              name
                              description
                            }
                            ... on Individual {
                              name
                              description
                            }
                            ... on Organization {
                              name
                              description
                            }
                            ... on Sector {
                              name
                              description
                            }
                            ... on System {
                              name
                              description
                            }
                            ... on Indicator {
                              name
                              description
                              valid_from
                            }
                            ... on Infrastructure {
                              name
                              description
                            }
                            ... on IntrusionSet {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Position {
                              name
                              description
                            }
                            ... on City {
                              name
                              description
                            }
                            ... on Country {
                              name
                              description
                            }
                            ... on Region {
                              name
                              description
                            }
                            ... on Malware {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on ThreatActor {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Tool {
                              name
                              description
                            }
                            ... on Vulnerability {
                              name
                              description
                            }
                            ... on Incident {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on StixCyberObservable {
                              observable_value
                              x_opencti_description
                            }
                          }
                        }
                      }
                    }
                  }
                  to {
                    ... on BasicObject {
                      id
                      entity_type
                      parent_types
                    }
                    ... on BasicRelationship {
                      id
                      entity_type
                      parent_types
                    }
                    ... on StixCoreObject {
                      created_at
                    }
                    ... on StixCoreRelationship {
                      created_at
                      start_time
                      stop_time
                      created
                    }
                    ... on AttackPattern {
                      name
                    }
                    ... on Campaign {
                      name
                    }
                    ... on CourseOfAction {
                      name
                    }
                    ... on Individual {
                      name
                    }
                    ... on Organization {
                      name
                    }
                    ... on Sector {
                      name
                    }
                    ... on System {
                      name
                    }
                    ... on Indicator {
                      name
                    }
                    ... on Infrastructure {
                      name
                    }
                    ... on IntrusionSet {
                      name
                    }
                    ... on Position {
                      name
                    }
                    ... on City {
                      name
                    }
                    ... on Country {
                      name
                    }
                    ... on Region {
                      name
                    }
                    ... on Malware {
                      name
                    }
                    ... on ThreatActor {
                      name
                    }
                    ... on Tool {
                      name
                    }
                    ... on Vulnerability {
                      name
                    }
                    ... on Incident {
                      name
                    }
                    ... on StixCyberObservable {
                      observable_value
                    }
                    ... on ObservedData {
                      objects(first: 1) {
                        edges {
                          node {
                            ... on StixCoreObject {
                              id
                              entity_type
                              parent_types
                              created_at
                              createdBy {
                                ... on Identity {
                                  id
                                  name
                                  entity_type
                                }
                              }
                              objectMarking {
                                edges {
                                  node {
                                    id
                                    definition
                                  }
                                }
                              }
                            }
                            ... on AttackPattern {
                              name
                              description
                              x_mitre_id
                            }
                            ... on Campaign {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Note {
                              attribute_abstract
                            }
                            ... on ObservedData {
                              first_observed
                              last_observed
                            }
                            ... on Opinion {
                              opinion
                            }
                            ... on Report {
                              name
                              description
                              published
                            }
                            ... on CourseOfAction {
                              name
                              description
                            }
                            ... on Individual {
                              name
                              description
                            }
                            ... on Organization {
                              name
                              description
                            }
                            ... on Sector {
                              name
                              description
                            }
                            ... on System {
                              name
                              description
                            }
                            ... on Indicator {
                              name
                              description
                              valid_from
                            }
                            ... on Infrastructure {
                              name
                              description
                            }
                            ... on IntrusionSet {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Position {
                              name
                              description
                            }
                            ... on City {
                              name
                              description
                            }
                            ... on Country {
                              name
                              description
                            }
                            ... on Region {
                              name
                              description
                            }
                            ... on Malware {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on ThreatActor {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Tool {
                              name
                              description
                            }
                            ... on Vulnerability {
                              name
                              description
                            }
                            ... on Incident {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on StixCyberObservable {
                              observable_value
                              x_opencti_description
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            ... on StixSightingRelationship {
              id
              created_at
              from {
                ... on BasicObject {
                  id
                  entity_type
                  parent_types
                }
                ... on BasicRelationship {
                  id
                  entity_type
                  parent_types
                }
                ... on StixCoreObject {
                  created_at
                }
                ... on StixCoreRelationship {
                  relationship_type
                  created_at
                  start_time
                  stop_time
                  created
                }
                ... on AttackPattern {
                  name
                }
                ... on Campaign {
                  name
                }
                ... on CourseOfAction {
                  name
                }
                ... on Individual {
                  name
                }
                ... on Organization {
                  name
                }
                ... on Sector {
                  name
                }
                ... on System {
                  name
                }
                ... on Indicator {
                  name
                }
                ... on Infrastructure {
                  name
                }
                ... on IntrusionSet {
                  name
                }
                ... on Position {
                  name
                }
                ... on City {
                  name
                }
                ... on Country {
                  name
                }
                ... on Region {
                  name
                }
                ... on Malware {
                  name
                }
                ... on ThreatActor {
                  name
                }
                ... on Tool {
                  name
                }
                ... on Vulnerability {
                  name
                }
                ... on Incident {
                  name
                }
                ... on StixCyberObservable {
                  observable_value
                }
                ... on ObservedData {
                  objects(first: 1) {
                    edges {
                      node {
                        ... on StixCoreObject {
                          id
                          entity_type
                          parent_types
                          created_at
                          createdBy {
                            ... on Identity {
                              id
                              name
                              entity_type
                            }
                          }
                          objectMarking {
                            edges {
                              node {
                                id
                                definition
                              }
                            }
                          }
                        }
                        ... on AttackPattern {
                          name
                          description
                          x_mitre_id
                        }
                        ... on Campaign {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on Note {
                          attribute_abstract
                        }
                        ... on ObservedData {
                          first_observed
                          last_observed
                        }
                        ... on Opinion {
                          opinion
                        }
                        ... on Report {
                          name
                          description
                          published
                        }
                        ... on CourseOfAction {
                          name
                          description
                        }
                        ... on Individual {
                          name
                          description
                        }
                        ... on Organization {
                          name
                          description
                        }
                        ... on Sector {
                          name
                          description
                        }
                        ... on System {
                          name
                          description
                        }
                        ... on Indicator {
                          name
                          description
                          valid_from
                        }
                        ... on Infrastructure {
                          name
                          description
                        }
                        ... on IntrusionSet {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on Position {
                          name
                          description
                        }
                        ... on City {
                          name
                          description
                        }
                        ... on Country {
                          name
                          description
                        }
                        ... on Region {
                          name
                          description
                        }
                        ... on Malware {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on ThreatActor {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on Tool {
                          name
                          description
                        }
                        ... on Vulnerability {
                          name
                          description
                        }
                        ... on Incident {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on StixCyberObservable {
                          observable_value
                          x_opencti_description
                        }
                      }
                    }
                  }
                }
                ... on StixCoreRelationship {
                  id
                  entity_type
                  relationship_type
                  start_time
                  stop_time
                  created
                  from {
                    ... on BasicObject {
                      id
                      entity_type
                    }
                    ... on BasicRelationship {
                      id
                      entity_type
                    }
                    ... on StixCoreObject {
                      created_at
                    }
                    ... on StixCoreRelationship {
                      created_at
                      start_time
                      stop_time
                      created
                    }
                    ... on AttackPattern {
                      name
                    }
                    ... on Campaign {
                      name
                    }
                    ... on CourseOfAction {
                      name
                    }
                    ... on Individual {
                      name
                    }
                    ... on Organization {
                      name
                    }
                    ... on Sector {
                      name
                    }
                    ... on System {
                      name
                    }
                    ... on Indicator {
                      name
                    }
                    ... on Infrastructure {
                      name
                    }
                    ... on IntrusionSet {
                      name
                    }
                    ... on Position {
                      name
                    }
                    ... on City {
                      name
                    }
                    ... on Country {
                      name
                    }
                    ... on Region {
                      name
                    }
                    ... on Malware {
                      name
                    }
                    ... on ThreatActor {
                      name
                    }
                    ... on Tool {
                      name
                    }
                    ... on Vulnerability {
                      name
                    }
                    ... on Incident {
                      name
                    }
                  }
                  to {
                    ... on BasicObject {
                      id
                      entity_type
                    }
                    ... on BasicRelationship {
                      id
                      entity_type
                    }
                    ... on StixCoreObject {
                      created_at
                    }
                    ... on StixCoreRelationship {
                      created_at
                      start_time
                      stop_time
                      created
                    }
                    ... on AttackPattern {
                      name
                    }
                    ... on Campaign {
                      name
                    }
                    ... on CourseOfAction {
                      name
                    }
                    ... on Individual {
                      name
                    }
                    ... on Organization {
                      name
                    }
                    ... on Sector {
                      name
                    }
                    ... on System {
                      name
                    }
                    ... on Indicator {
                      name
                    }
                    ... on Infrastructure {
                      name
                    }
                    ... on IntrusionSet {
                      name
                    }
                    ... on Position {
                      name
                    }
                    ... on City {
                      name
                    }
                    ... on Country {
                      name
                    }
                    ... on Region {
                      name
                    }
                    ... on Malware {
                      name
                    }
                    ... on ThreatActor {
                      name
                    }
                    ... on Tool {
                      name
                    }
                    ... on Vulnerability {
                      name
                    }
                    ... on Incident {
                      name
                    }
                    ... on ObservedData {
                      objects(first: 1) {
                        edges {
                          node {
                            ... on StixCoreObject {
                              id
                              entity_type
                              parent_types
                              created_at
                              createdBy {
                                ... on Identity {
                                  id
                                  name
                                  entity_type
                                }
                              }
                              objectMarking {
                                edges {
                                  node {
                                    id
                                    definition
                                  }
                                }
                              }
                            }
                            ... on AttackPattern {
                              name
                              description
                              x_mitre_id
                            }
                            ... on Campaign {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Note {
                              attribute_abstract
                            }
                            ... on ObservedData {
                              first_observed
                              last_observed
                            }
                            ... on Opinion {
                              opinion
                            }
                            ... on Report {
                              name
                              description
                              published
                            }
                            ... on CourseOfAction {
                              name
                              description
                            }
                            ... on Individual {
                              name
                              description
                            }
                            ... on Organization {
                              name
                              description
                            }
                            ... on Sector {
                              name
                              description
                            }
                            ... on System {
                              name
                              description
                            }
                            ... on Indicator {
                              name
                              description
                              valid_from
                            }
                            ... on Infrastructure {
                              name
                              description
                            }
                            ... on IntrusionSet {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Position {
                              name
                              description
                            }
                            ... on City {
                              name
                              description
                            }
                            ... on Country {
                              name
                              description
                            }
                            ... on Region {
                              name
                              description
                            }
                            ... on Malware {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on ThreatActor {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Tool {
                              name
                              description
                            }
                            ... on Vulnerability {
                              name
                              description
                            }
                            ... on Incident {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on StixCyberObservable {
                              observable_value
                              x_opencti_description
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              to {
                ... on BasicObject {
                  id
                  entity_type
                  parent_types
                }
                ... on BasicRelationship {
                  id
                  entity_type
                  parent_types
                }
                ... on StixCoreObject {
                  created_at
                }
                ... on StixCoreRelationship {
                  created_at
                  relationship_type
                  start_time
                  stop_time
                  created
                }
                ... on AttackPattern {
                  name
                }
                ... on Campaign {
                  name
                }
                ... on CourseOfAction {
                  name
                }
                ... on Individual {
                  name
                }
                ... on Organization {
                  name
                }
                ... on Sector {
                  name
                }
                ... on System {
                  name
                }
                ... on Indicator {
                  name
                }
                ... on Infrastructure {
                  name
                }
                ... on IntrusionSet {
                  name
                }
                ... on Position {
                  name
                }
                ... on City {
                  name
                }
                ... on Country {
                  name
                }
                ... on Region {
                  name
                }
                ... on Malware {
                  name
                }
                ... on ThreatActor {
                  name
                }
                ... on Tool {
                  name
                }
                ... on Vulnerability {
                  name
                }
                ... on Incident {
                  name
                }
                ... on StixCyberObservable {
                  observable_value
                }
                ... on ObservedData {
                  objects(first: 1) {
                    edges {
                      node {
                        ... on StixCoreObject {
                          id
                          entity_type
                          parent_types
                          created_at
                          createdBy {
                            ... on Identity {
                              id
                              name
                              entity_type
                            }
                          }
                          objectMarking {
                            edges {
                              node {
                                id
                                definition
                              }
                            }
                          }
                        }
                        ... on AttackPattern {
                          name
                          description
                          x_mitre_id
                        }
                        ... on Campaign {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on Note {
                          attribute_abstract
                        }
                        ... on ObservedData {
                          first_observed
                          last_observed
                        }
                        ... on Opinion {
                          opinion
                        }
                        ... on Report {
                          name
                          description
                          published
                        }
                        ... on CourseOfAction {
                          name
                          description
                        }
                        ... on Individual {
                          name
                          description
                        }
                        ... on Organization {
                          name
                          description
                        }
                        ... on Sector {
                          name
                          description
                        }
                        ... on System {
                          name
                          description
                        }
                        ... on Indicator {
                          name
                          description
                          valid_from
                        }
                        ... on Infrastructure {
                          name
                          description
                        }
                        ... on IntrusionSet {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on Position {
                          name
                          description
                        }
                        ... on City {
                          name
                          description
                        }
                        ... on Country {
                          name
                          description
                        }
                        ... on Region {
                          name
                          description
                        }
                        ... on Malware {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on ThreatActor {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on Tool {
                          name
                          description
                        }
                        ... on Vulnerability {
                          name
                          description
                        }
                        ... on Incident {
                          name
                          description
                          first_seen
                          last_seen
                        }
                        ... on StixCyberObservable {
                          observable_value
                          x_opencti_description
                        }
                      }
                    }
                  }
                }
                ... on StixCoreRelationship {
                  id
                  entity_type
                  relationship_type
                  start_time
                  stop_time
                  created
                  from {
                    ... on BasicObject {
                      id
                      entity_type
                      parent_types
                    }
                    ... on BasicRelationship {
                      id
                      entity_type
                      parent_types
                    }
                    ... on StixCoreObject {
                      created_at
                    }
                    ... on StixCoreRelationship {
                      created_at
                      start_time
                      stop_time
                      created
                    }
                    ... on AttackPattern {
                      name
                    }
                    ... on Campaign {
                      name
                    }
                    ... on CourseOfAction {
                      name
                    }
                    ... on Individual {
                      name
                    }
                    ... on Organization {
                      name
                    }
                    ... on Sector {
                      name
                    }
                    ... on System {
                      name
                    }
                    ... on Indicator {
                      name
                    }
                    ... on Infrastructure {
                      name
                    }
                    ... on IntrusionSet {
                      name
                    }
                    ... on Position {
                      name
                    }
                    ... on City {
                      name
                    }
                    ... on Country {
                      name
                    }
                    ... on Region {
                      name
                    }
                    ... on Malware {
                      name
                    }
                    ... on ThreatActor {
                      name
                    }
                    ... on Tool {
                      name
                    }
                    ... on Vulnerability {
                      name
                    }
                    ... on Incident {
                      name
                    }
                    ... on StixCyberObservable {
                      observable_value
                    }
                    ... on ObservedData {
                      objects(first: 1) {
                        edges {
                          node {
                            ... on StixCoreObject {
                              id
                              entity_type
                              parent_types
                              created_at
                              createdBy {
                                ... on Identity {
                                  id
                                  name
                                  entity_type
                                }
                              }
                              objectMarking {
                                edges {
                                  node {
                                    id
                                    definition
                                  }
                                }
                              }
                            }
                            ... on AttackPattern {
                              name
                              description
                              x_mitre_id
                            }
                            ... on Campaign {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Note {
                              attribute_abstract
                            }
                            ... on ObservedData {
                              first_observed
                              last_observed
                            }
                            ... on Opinion {
                              opinion
                            }
                            ... on Report {
                              name
                              description
                              published
                            }
                            ... on CourseOfAction {
                              name
                              description
                            }
                            ... on Individual {
                              name
                              description
                            }
                            ... on Organization {
                              name
                              description
                            }
                            ... on Sector {
                              name
                              description
                            }
                            ... on System {
                              name
                              description
                            }
                            ... on Indicator {
                              name
                              description
                              valid_from
                            }
                            ... on Infrastructure {
                              name
                              description
                            }
                            ... on IntrusionSet {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Position {
                              name
                              description
                            }
                            ... on City {
                              name
                              description
                            }
                            ... on Country {
                              name
                              description
                            }
                            ... on Region {
                              name
                              description
                            }
                            ... on Malware {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on ThreatActor {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Tool {
                              name
                              description
                            }
                            ... on Vulnerability {
                              name
                              description
                            }
                            ... on Incident {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on StixCyberObservable {
                              observable_value
                              x_opencti_description
                            }
                          }
                        }
                      }
                    }
                  }
                  to {
                    ... on BasicObject {
                      id
                      entity_type
                      parent_types
                    }
                    ... on BasicRelationship {
                      id
                      entity_type
                      parent_types
                    }
                    ... on StixCoreObject {
                      created_at
                    }
                    ... on StixCoreRelationship {
                      created_at
                      start_time
                      stop_time
                      created
                    }
                    ... on AttackPattern {
                      name
                    }
                    ... on Campaign {
                      name
                    }
                    ... on CourseOfAction {
                      name
                    }
                    ... on Individual {
                      name
                    }
                    ... on Organization {
                      name
                    }
                    ... on Sector {
                      name
                    }
                    ... on System {
                      name
                    }
                    ... on Indicator {
                      name
                    }
                    ... on Infrastructure {
                      name
                    }
                    ... on IntrusionSet {
                      name
                    }
                    ... on Position {
                      name
                    }
                    ... on City {
                      name
                    }
                    ... on Country {
                      name
                    }
                    ... on Region {
                      name
                    }
                    ... on Malware {
                      name
                    }
                    ... on ThreatActor {
                      name
                    }
                    ... on Tool {
                      name
                    }
                    ... on Vulnerability {
                      name
                    }
                    ... on Incident {
                      name
                    }
                    ... on StixCyberObservable {
                      observable_value
                    }
                    ... on ObservedData {
                      objects(first: 1) {
                        edges {
                          node {
                            ... on StixCoreObject {
                              id
                              entity_type
                              parent_types
                              created_at
                              createdBy {
                                ... on Identity {
                                  id
                                  name
                                  entity_type
                                }
                              }
                              objectMarking {
                                edges {
                                  node {
                                    id
                                    definition
                                  }
                                }
                              }
                            }
                            ... on AttackPattern {
                              name
                              description
                              x_mitre_id
                            }
                            ... on Campaign {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Note {
                              attribute_abstract
                            }
                            ... on ObservedData {
                              first_observed
                              last_observed
                            }
                            ... on Opinion {
                              opinion
                            }
                            ... on Report {
                              name
                              description
                              published
                            }
                            ... on CourseOfAction {
                              name
                              description
                            }
                            ... on Individual {
                              name
                              description
                            }
                            ... on Organization {
                              name
                              description
                            }
                            ... on Sector {
                              name
                              description
                            }
                            ... on System {
                              name
                              description
                            }
                            ... on Indicator {
                              name
                              description
                              valid_from
                            }
                            ... on Infrastructure {
                              name
                              description
                            }
                            ... on IntrusionSet {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Position {
                              name
                              description
                            }
                            ... on City {
                              name
                              description
                            }
                            ... on Country {
                              name
                              description
                            }
                            ... on Region {
                              name
                              description
                            }
                            ... on Malware {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on ThreatActor {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on Tool {
                              name
                              description
                            }
                            ... on Vulnerability {
                              name
                              description
                            }
                            ... on Incident {
                              name
                              description
                              first_seen
                              last_seen
                            }
                            ... on StixCyberObservable {
                              observable_value
                              x_opencti_description
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        createdBy {
          ... on Identity {
            id
            name
            entity_type
          }
        }
        objectMarking {
          edges {
            node {
              id
              definition
              x_opencti_color
            }
          }
        }
        from {
          ... on BasicObject {
            id
            entity_type
            parent_types
          }
          ... on BasicRelationship {
            id
            entity_type
            parent_types
          }
          ... on StixCoreObject {
            created_at
          }
          ... on StixCoreRelationship {
            created_at
            start_time
            stop_time
            created
          }
          ... on AttackPattern {
            name
          }
          ... on Campaign {
            name
          }
          ... on CourseOfAction {
            name
          }
          ... on Individual {
            name
          }
          ... on Organization {
            name
          }
          ... on Sector {
            name
          }
          ... on System {
            name
          }
          ... on Indicator {
            name
          }
          ... on Infrastructure {
            name
          }
          ... on IntrusionSet {
            name
          }
          ... on Position {
            name
          }
          ... on City {
            name
          }
          ... on Country {
            name
          }
          ... on Region {
            name
          }
          ... on Malware {
            name
          }
          ... on ThreatActor {
            name
          }
          ... on Tool {
            name
          }
          ... on Vulnerability {
            name
          }
          ... on Incident {
            name
          }
          ... on StixCyberObservable {
            observable_value
          }
          ... on ObservedData {
            objects(first: 1) {
              edges {
                node {
                  ... on StixCoreObject {
                    id
                    entity_type
                    parent_types
                    created_at
                    createdBy {
                      ... on Identity {
                        id
                        name
                        entity_type
                      }
                    }
                    objectMarking {
                      edges {
                        node {
                          id
                          definition
                        }
                      }
                    }
                  }
                  ... on AttackPattern {
                    name
                    description
                    x_mitre_id
                  }
                  ... on Campaign {
                    name
                    description
                    first_seen
                    last_seen
                  }
                  ... on Note {
                    attribute_abstract
                  }
                  ... on ObservedData {
                    first_observed
                    last_observed
                  }
                  ... on Opinion {
                    opinion
                  }
                  ... on Report {
                    name
                    description
                    published
                  }
                  ... on CourseOfAction {
                    name
                    description
                  }
                  ... on Individual {
                    name
                    description
                  }
                  ... on Organization {
                    name
                    description
                  }
                  ... on Sector {
                    name
                    description
                  }
                  ... on System {
                    name
                    description
                  }
                  ... on Indicator {
                    name
                    description
                    valid_from
                  }
                  ... on Infrastructure {
                    name
                    description
                  }
                  ... on IntrusionSet {
                    name
                    description
                    first_seen
                    last_seen
                  }
                  ... on Position {
                    name
                    description
                  }
                  ... on City {
                    name
                    description
                  }
                  ... on Country {
                    name
                    description
                  }
                  ... on Region {
                    name
                    description
                  }
                  ... on Malware {
                    name
                    description
                    first_seen
                    last_seen
                  }
                  ... on ThreatActor {
                    name
                    description
                    first_seen
                    last_seen
                  }
                  ... on Tool {
                    name
                    description
                  }
                  ... on Vulnerability {
                    name
                    description
                  }
                  ... on Incident {
                    name
                    description
                    first_seen
                    last_seen
                  }
                  ... on StixCyberObservable {
                    observable_value
                    x_opencti_description
                  }
                }
              }
            }
          }
          ... on StixCoreRelationship {
            id
            entity_type
            relationship_type
            start_time
            stop_time
            created
            from {
              ... on BasicObject {
                id
                entity_type
              }
              ... on BasicRelationship {
                id
                entity_type
              }
              ... on StixCoreObject {
                created_at
              }
              ... on StixCoreRelationship {
                created_at
                start_time
                stop_time
                created
              }
              ... on AttackPattern {
                name
              }
              ... on Campaign {
                name
              }
              ... on CourseOfAction {
                name
              }
              ... on Individual {
                name
              }
              ... on Organization {
                name
              }
              ... on Sector {
                name
              }
              ... on System {
                name
              }
              ... on Indicator {
                name
              }
              ... on Infrastructure {
                name
              }
              ... on IntrusionSet {
                name
              }
              ... on Position {
                name
              }
              ... on City {
                name
              }
              ... on Country {
                name
              }
              ... on Region {
                name
              }
              ... on Malware {
                name
              }
              ... on ThreatActor {
                name
              }
              ... on Tool {
                name
              }
              ... on Vulnerability {
                name
              }
              ... on Incident {
                name
              }
            }
            to {
              ... on BasicObject {
                id
                entity_type
              }
              ... on BasicRelationship {
                id
                entity_type
              }
              ... on StixCoreObject {
                created_at
              }
              ... on StixCoreRelationship {
                created_at
                start_time
                stop_time
                created
              }
              ... on AttackPattern {
                name
              }
              ... on Campaign {
                name
              }
              ... on CourseOfAction {
                name
              }
              ... on Individual {
                name
              }
              ... on Organization {
                name
              }
              ... on Sector {
                name
              }
              ... on System {
                name
              }
              ... on Indicator {
                name
              }
              ... on Infrastructure {
                name
              }
              ... on IntrusionSet {
                name
              }
              ... on Position {
                name
              }
              ... on City {
                name
              }
              ... on Country {
                name
              }
              ... on Region {
                name
              }
              ... on Malware {
                name
              }
              ... on ThreatActor {
                name
              }
              ... on Tool {
                name
              }
              ... on Vulnerability {
                name
              }
              ... on Incident {
                name
              }
            }
          }
        }
        to {
          ... on BasicObject {
            id
            entity_type
            parent_types
          }
          ... on BasicRelationship {
            id
            entity_type
            parent_types
          }
          ... on StixCoreObject {
            created_at
          }
          ... on StixCoreRelationship {
            created_at
            start_time
            stop_time
            created
          }
          ... on AttackPattern {
            name
          }
          ... on Campaign {
            name
          }
          ... on CourseOfAction {
            name
          }
          ... on Individual {
            name
          }
          ... on Organization {
            name
          }
          ... on Sector {
            name
          }
          ... on System {
            name
          }
          ... on Indicator {
            name
          }
          ... on Infrastructure {
            name
          }
          ... on IntrusionSet {
            name
          }
          ... on Position {
            name
          }
          ... on City {
            name
          }
          ... on Country {
            name
          }
          ... on Region {
            name
          }
          ... on Malware {
            name
          }
          ... on ThreatActor {
            name
          }
          ... on Tool {
            name
          }
          ... on Vulnerability {
            name
          }
          ... on Incident {
            name
          }
          ... on StixCyberObservable {
            observable_value
          }
          ... on ObservedData {
            objects(first: 1) {
              edges {
                node {
                  ... on StixCoreObject {
                    id
                    entity_type
                    parent_types
                    created_at
                    createdBy {
                      ... on Identity {
                        id
                        name
                        entity_type
                      }
                    }
                    objectMarking {
                      edges {
                        node {
                          id
                          definition
                        }
                      }
                    }
                  }
                  ... on AttackPattern {
                    name
                    description
                    x_mitre_id
                  }
                  ... on Campaign {
                    name
                    description
                    first_seen
                    last_seen
                  }
                  ... on Note {
                    attribute_abstract
                  }
                  ... on ObservedData {
                    first_observed
                    last_observed
                  }
                  ... on Opinion {
                    opinion
                  }
                  ... on Report {
                    name
                    description
                    published
                  }
                  ... on CourseOfAction {
                    name
                    description
                  }
                  ... on Individual {
                    name
                    description
                  }
                  ... on Organization {
                    name
                    description
                  }
                  ... on Sector {
                    name
                    description
                  }
                  ... on System {
                    name
                    description
                  }
                  ... on Indicator {
                    name
                    description
                    valid_from
                  }
                  ... on Infrastructure {
                    name
                    description
                  }
                  ... on IntrusionSet {
                    name
                    description
                    first_seen
                    last_seen
                  }
                  ... on Position {
                    name
                    description
                  }
                  ... on City {
                    name
                    description
                  }
                  ... on Country {
                    name
                    description
                  }
                  ... on Region {
                    name
                    description
                  }
                  ... on Malware {
                    name
                    description
                    first_seen
                    last_seen
                  }
                  ... on ThreatActor {
                    name
                    description
                    first_seen
                    last_seen
                  }
                  ... on Tool {
                    name
                    description
                  }
                  ... on Vulnerability {
                    name
                    description
                  }
                  ... on Incident {
                    name
                    description
                    first_seen
                    last_seen
                  }
                  ... on StixCyberObservable {
                    observable_value
                    x_opencti_description
                  }
                }
              }
            }
          }
          ... on StixCoreRelationship {
            id
            entity_type
            relationship_type
            start_time
            stop_time
            created
            from {
              ... on BasicObject {
                id
                entity_type
                parent_types
              }
              ... on BasicRelationship {
                id
                entity_type
                parent_types
              }
              ... on AttackPattern {
                name
              }
              ... on Campaign {
                name
              }
              ... on CourseOfAction {
                name
              }
              ... on Individual {
                name
              }
              ... on Organization {
                name
              }
              ... on Sector {
                name
              }
              ... on System {
                name
              }
              ... on Indicator {
                name
              }
              ... on Infrastructure {
                name
              }
              ... on IntrusionSet {
                name
              }
              ... on Position {
                name
              }
              ... on City {
                name
              }
              ... on Country {
                name
              }
              ... on Region {
                name
              }
              ... on Malware {
                name
              }
              ... on ThreatActor {
                name
              }
              ... on Tool {
                name
              }
              ... on Vulnerability {
                name
              }
              ... on Incident {
                name
              }
              ... on StixCyberObservable {
                observable_value
              }
            }
            to {
              ... on BasicObject {
                id
                entity_type
                parent_types
              }
              ... on BasicRelationship {
                id
                entity_type
                parent_types
              }
              ... on AttackPattern {
                name
              }
              ... on Campaign {
                name
              }
              ... on CourseOfAction {
                name
              }
              ... on Individual {
                name
              }
              ... on Organization {
                name
              }
              ... on Sector {
                name
              }
              ... on System {
                name
              }
              ... on Indicator {
                name
              }
              ... on Infrastructure {
                name
              }
              ... on IntrusionSet {
                name
              }
              ... on Position {
                name
              }
              ... on City {
                name
              }
              ... on Country {
                name
              }
              ... on Region {
                name
              }
              ... on Malware {
                name
              }
              ... on ThreatActor {
                name
              }
              ... on Tool {
                name
              }
              ... on Vulnerability {
                name
              }
              ... on Incident {
                name
              }
              ... on StixCyberObservable {
                observable_value
              }
            }
          }
        }
      }
    `,
  },
);
export const RelationshipsStixCoreRelationshipLine = compose(
  inject18n,
  withStyles(styles),
)(RelationshipsStixCoreRelationshipLineFragment);

class RelationshipsStixCoreRelationshipLineDummyComponent extends Component {
  render() {
    const { classes, dataColumns } = this.props;
    return (
      <ListItem
        classes={{ root: classes.item }}
        divider={true}
        style={{ minWidth: 40 }}
      >
        <ListItemIcon classes={{ root: classes.itemIcon }}>
          <Skeleton
            animation="wave"
            variant="circular"
            width={30}
            height={30}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <div>
              <div
                className={classes.bodyItem}
                style={{ width: dataColumns.fromType.width }}
              >
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="90%"
                  height="100%"
                />
              </div>
              <div
                className={classes.bodyItem}
                style={{ width: dataColumns.fromName.width }}
              >
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="90%"
                  height="100%"
                />
              </div>
              <div
                className={classes.bodyItem}
                style={{ width: dataColumns.relationship_type.width }}
              >
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="90%"
                  height="100%"
                />
              </div>
              <div
                className={classes.bodyItem}
                style={{ width: dataColumns.toType.width }}
              >
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="90%"
                  height="100%"
                />
              </div>
              <div
                className={classes.bodyItem}
                style={{ width: dataColumns.toName.width }}
              >
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="90%"
                  height="100%"
                />
              </div>
              <div
                className={classes.bodyItem}
                style={{ width: dataColumns.created_at.width }}
              >
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={140}
                  height="100%"
                />
              </div>
              <div
                className={classes.bodyItem}
                style={{ width: dataColumns.createdBy.width }}
              >
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="90%"
                  height="100%"
                />
              </div>
              <div
                className={classes.bodyItem}
                style={{ width: dataColumns.objectMarking.width }}
              >
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={100}
                  height="100%"
                />
              </div>
            </div>
          }
        />
      </ListItem>
    );
  }
}

RelationshipsStixCoreRelationshipLineDummyComponent.propTypes = {
  dataColumns: PropTypes.object,
  classes: PropTypes.object,
};

export const RelationshipsStixCoreRelationshipLineDummy = compose(
  inject18n,
  withStyles(styles),
)(RelationshipsStixCoreRelationshipLineDummyComponent);
