/*
  Called by the React app on startup and when the list type is changed.
  Returns sorted and cut-down sublists of members using the members list
  Each sublist contains name, abbreviation, ID and individual members list.
  [{ name, ID, memberinfos:[{member, roleTitle, rank}, ...] }, ...]
*/


// The default party list, contains all member grouped by largest party
// Members within the list are sorted by rank
export function getPartyList(memberData) {
  const partyList = [];
  for (let i = 0; i < memberData.length; i++) {
    const member = memberData[i];
    const party = partyList.find((p) => p.ID === member.party.ID);
    let roleTitle = '';
    let rank = 10;
    if (member.govtRole) {
      roleTitle = member.govtRole.title;
      rank = member.govtRole.rank;
    } else if (member.party.role) {
      roleTitle = member.party.role.title;
      rank = member.party.role.rank;
    }
    if (!party) {
      const newParty = {
        name: member.party.name,
        abbreviation: member.party.abbreviation,
        ID: member.party.ID,
        memberInfos: [{ member, roleTitle, rank }],
      };
      partyList.push(newParty);
    } else {
      party.memberInfos.push({ member, roleTitle, rank });
    }
  }

  partyList.sort((a, b) => a.memberInfos.length < b.memberInfos.length);
  partyList.forEach((pl) => pl.memberInfos.sort((a, b) => a.rank - b.rank));
  return partyList;
}

export function getGroupList(memberData, groupToDisplay) {
  let arrToSearch = '';
  if (groupToDisplay === 'committee') arrToSearch = 'committees';
  if (groupToDisplay === 'cpg') arrToSearch = 'cpgs';
  const groupList = [];

  for (let i = 0; i < memberData.length; i++) {
    const member = memberData[i];
    if (member[arrToSearch] && member[arrToSearch].length > 0) {
      for (let g = 0; g < member[arrToSearch].length; g++) {
        const memberGroupInfo = member[arrToSearch][g];
        const group = groupList.find((c) => c.ID === memberGroupInfo.ID);
        if (!group) {
          groupList.push({
            name: memberGroupInfo.name,
            ID: memberGroupInfo.ID,
            memberInfos: [{ member, roleTitle: memberGroupInfo.role, rank: memberGroupInfo.rank }],
          });
        } else {
          group.memberInfos.push({
            member,
            roleTitle: memberGroupInfo.role,
            rank: memberGroupInfo.rank,
          });
        }
      }
    }
  }
  groupList.sort((a, b) => a.memberInfos.length < b.memberInfos.length);
  groupList.forEach((gl) => gl.memberInfos.sort((a, b) => a.rank - b.rank));
  return groupList;
}
