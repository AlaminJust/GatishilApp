export enum SortOrders {
    Ascending,
    Descending
}

export enum OrganizationTypes {
    Shared,
    Country,
    Public,
    Private,
    Favorite
}

export function mapOrganizationTypeToString(type: OrganizationTypes): string {
    switch (type) {
      case OrganizationTypes.Shared:
        return 'Shared';
      case OrganizationTypes.Country:
        return 'Country';
      case OrganizationTypes.Public:
        return 'Public';
      case OrganizationTypes.Private:
        return 'Private';
      case OrganizationTypes.Favorite:
        return 'Favorite';
      default:
        return '';
    }
}