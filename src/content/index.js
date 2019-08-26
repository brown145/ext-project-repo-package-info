import fetchProjectScripts from './fetchProjectScripts';
import eventTypes from '../common/eventTypes';
import pubSub from '../common/pubSub';

pubSub.add(eventTypes.GET_SCRIPTS, fetchProjectScripts, { async: true });
