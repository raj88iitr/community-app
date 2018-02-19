import PT from 'prop-types';
import React from 'react';

import CommunityBlog from './CommunityBlog';
import MemberMetrics from './MemberMetrics';
import CurrentActivity from './CurrentActivity';
import Header from './Header';

import './style.scss';

export default function Dashboard({
  achievements,
  achievementsLoading,
  challenges,
  challengesLoading,
  finances,
  financesLoading,
  selectChallengeDetailsTab,
  setChallengeListingFilter,
  showEarnings,
  stats,
  statsLoading,
  switchShowEarnings,
  tcBlogLoading,
  tcBlogPosts,
  unregisterFromChallenge,
}) {
  return (
    <div styleName="container">
      <div styleName="page">
        <Header
          achievements={achievements}
          achievementsLoading={achievementsLoading}
        />
        <MemberMetrics
          finances={finances}
          financesLoading={financesLoading}
          showEarnings={showEarnings}
          stats={stats}
          statsLoading={statsLoading}
          switchShowEarnings={switchShowEarnings}
        />
        <CurrentActivity
          challenges={challenges}
          challengesLoading={challengesLoading}
          selectChallengeDetailsTab={selectChallengeDetailsTab}
          setChallengeListingFilter={setChallengeListingFilter}
          unregisterFromChallenge={unregisterFromChallenge}

          // communityList={communityList}
          // stats={stats}
          // groups={profile ? profile.groups : []}
        />
      {/*}
        achievements={achievements} myChallenges={myChallenges.length} />
        <div styleName="my-dashboard-container">
          {
            st.announcementId ? (
              <Announcement id={st.announcementId} />
            ) : null
          }
          <div styleName="challenges">
            {
              loadingActiveChallenges &&
              <LoadingIndicator theme={{}} />
            }
            {
              !loadingActiveChallenges &&
              <MyChallenges
                challenges={myChallenges}
                communityList={communityList}
                stats={stats}
                groups={profile ? profile.groups : []}
              />
            }
          </div>
          <div styleName="srms">
            {
              loadingSRMs &&
              <LoadingIndicator theme={{}} />
            }
            {
              !loadingSRMs &&
              <SRM srms={srms} />
            }
          </div>
          */}
        <CommunityBlog isLoading={tcBlogLoading} posts={tcBlogPosts} />
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  achievements: PT.arrayOf(PT.object).isRequired,
  achievementsLoading: PT.bool.isRequired,
  challenges: PT.arrayOf(PT.object).isRequired,
  challengesLoading: PT.bool.isRequired,
  finances: PT.arrayOf(PT.object).isRequired,
  financesLoading: PT.bool.isRequired,
  selectChallengeDetailsTab: PT.func.isRequired,
  setChallengeListingFilter: PT.func.isRequired,
  showEarnings: PT.bool.isRequired,
  stats: PT.shape().isRequired,
  statsLoading: PT.bool.isRequired,
  switchShowEarnings: PT.func.isRequired,
  tcBlogLoading: PT.bool.isRequired,
  tcBlogPosts: PT.arrayOf(PT.object).isRequired,
  unregisterFromChallenge: PT.func.isRequired,
};
